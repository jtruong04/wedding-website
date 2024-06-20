import type { PageServerLoad } from './$types';
import { findRow, getSheet } from '$lib/server/sheet';

import { type Option } from '$lib/types';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800 });

export const load = (async () => {
	let options:{
		paypal_link: string|undefined;
		venmo_link: string|undefined;
		zelle_email: string|undefined;
		zelle_phone: string|undefined;
		registry_text: string|undefined;
	} = cache.get('options') as any;
	if (options === undefined) {
		const sheet = await getSheet('Options');
		options = {
			paypal_link: (await findRow<Option>(sheet, 'key', 'paypal'))?.get('value'),
			venmo_link: (await findRow<Option>(sheet, 'key', 'venmo'))?.get('value'),
			zelle_email: (await findRow<Option>(sheet, 'key', 'zelle_email'))?.get('value'),
			zelle_phone: (await findRow<Option>(sheet, 'key', 'zelle_phone'))?.get('value'),
			registry_text: (await findRow<Option>(sheet, 'key', 'registry_text'))?.get('value'),
		}
		cache.set('options', options);
	}
	return options;
}) satisfies PageServerLoad;
