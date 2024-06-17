import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import {schema} from './schema';
import {fail, setError, superValidate} from 'sveltekit-superforms';
import {zod} from 'sveltekit-superforms/adapters';
import { findRow } from '$lib/server/sheet';
import type { Code, Guest } from '$lib/types';

export const load = (async () => {
    return {
        form: await superValidate(zod(schema))
    };
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(schema));
        if (!form.valid) {
            return fail(400, {form});
        }
        const code = form.data.passcode.join('').toLowerCase();
        if (!(await findRow<Code>("Codes", "code", code)) && !(await findRow<Guest>("Guests", "id", code))) {
            return setError(form, 'passcode._errors', "This code is not valid!", {
                status: 404
            });
        }
        redirect(303, `/rsvp/${code}`)
    }
};