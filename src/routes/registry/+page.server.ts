import type { PageServerLoad } from './$types';
import { findRow, getSheet } from '$lib/server/sheet';

import { type Option } from '$lib/types';

export const load = (async () => {
	const sheet = await getSheet('Options');

	return {
		paypal_link: (await findRow<Option>(sheet, 'key', 'paypal'))?.get('value'),
		venmo_link: (await findRow<Option>(sheet, 'key', 'venmo'))?.get('value'),
		zelle_email: (await findRow<Option>(sheet, 'key', 'zelle_email'))?.get('value'),
		zelle_phone: (await findRow<Option>(sheet, 'key', 'zelle_phone'))?.get('value'),
		registry_text: (await findRow<Option>(sheet, 'key', 'registry_text'))?.get('value'),
	};
}) satisfies PageServerLoad;
