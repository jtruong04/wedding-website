import { findRow, getSheet } from '$lib/server/sheet';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Guest } from '$lib/types';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { schema, type Message } from './schema';
import { createUniqueCode } from '$lib/random';
import { sendEmailTemplate } from '$lib/server/email';
import { MAILGUN_DOMAIN } from '$env/static/private';
import { checkCode } from '$lib/server/codes';

export const load = (async ({ params }) => {
	const code = params.code.toLowerCase();

	const isGlobalCode = checkCode(code);
	const rsvpRow = await findRow<Guest>('Guests', 'id', code);
	if (!isGlobalCode && !rsvpRow) {
		return redirect(303, '/rsvp');
	}

	const data = {
		code,
		rsvp: rsvpRow?.toObject() as Guest,
		form: await superValidate(zod(schema)),
		guest: undefined as Guest | undefined,
		guest_of: undefined as Guest | undefined
	};

	if (rsvpRow?.get('guestId')) {
		const guestRow = await findRow<Guest>('Guests', 'id', rsvpRow.get('guestId'));
		data.guest = guestRow?.toObject() as Guest;
	}
	if (rsvpRow?.get('usedCode')) {
		const guestOfRow = await findRow<Guest>('Guests', 'id', rsvpRow.get('usedCode'));
		data.guest_of = guestOfRow?.toObject() as Guest;
	}
	return data;
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return fail(400, { form });
		}
		const code = params.code.toLowerCase();
		const sheet = await getSheet('Guests');
		let rsvp = await findRow<Guest>(sheet, 'id', code);

		let mainRsvpObj: Guest | undefined;
		let guestRsvpObj: Guest | undefined;
		const allCodes = new Set<string>(
			(await sheet.getRows<Guest>()).filter((r) => r.get('id')).map((r) => r.get('id'))
		);

		if (!rsvp) {
			// No existing RSVP. Make new one for main guest and plus one if applicable
			const newCode = createUniqueCode(4, allCodes);
			rsvp = await sheet.addRow({
				id: newCode,
				usedCode: code,
				fullName: form.data.full_name,
				email: form.data.email || '',
				isComing: form.data.is_coming,
				plusOne: form.data.plus_one,
				notes: form.data.notes || ''
			});
			if (form.data.plus_one === 'TRUE') {
				allCodes.add(newCode);
				const guestCode = createUniqueCode(4, allCodes);
				rsvp.set('guestId', guestCode);
				const guestRsvp = await sheet.addRow({
					id: guestCode,
					usedCode: newCode,
					fullName: form.data.guest_name || '',
					isComing: 'TRUE',
					plusOne: 'FALSE'
				});
				await guestRsvp.save();
				guestRsvpObj = guestRsvp.toObject() as Guest;
			}
			await rsvp.save();
			mainRsvpObj = rsvp.toObject() as Guest;
		} else {
			let guestRsvp = await findRow<Guest>(sheet, 'id', rsvp.get('guestId'));
			if (!guestRsvp && form.data.plus_one === 'TRUE') {
				const guestCode = createUniqueCode(4, allCodes);
				guestRsvp = await sheet.addRow({
					id: guestCode,
					usedCode: rsvp.get('id'),
					fullName: form.data.guest_name || '',
					isComing: 'TRUE',
					plusOne: 'FALSE'
				});
				rsvp.set('guestId', guestCode);
			}
			rsvp.assign({
				...(rsvp.toObject() as Guest),
				fullName: form.data.full_name,
				email: form.data.email || '',
				isComing: form.data.is_coming,
				plusOne: form.data.plus_one,
				notes: form.data.notes || ''
			});
			guestRsvp?.assign({
				...(guestRsvp.toObject() as Guest),
				fullName: form.data.guest_name || guestRsvp.get('fullName') || '',
				isComing: form.data.plus_one
			});
			await rsvp.save();
			mainRsvpObj = rsvp.toObject() as Guest;
			await guestRsvp?.save();
			guestRsvpObj = guestRsvp?.toObject() as Guest;
		}

		if (form.data.email_confirm) {
			await sendEmailTemplate(
				`John and Jessica <rsvp@${MAILGUN_DOMAIN}>`,
				[rsvp.get('email')],
				rsvp?.get('isComing') === 'TRUE' ? "We're so excited to have you join us!" : "We're sorry you can't make it!",
				rsvp?.get('isComing') === 'TRUE' ? 'rsvp_yes' : 'rsvp_no',
				{
					rsvp: mainRsvpObj,
					guest: guestRsvpObj,
					full_name: rsvp.get('fullName'),
					code: rsvp.get('id')
				}
			);
		}
		return message(form, {
			rsvp: mainRsvpObj,
			guest: guestRsvpObj,
		} as Message)
	}
};
