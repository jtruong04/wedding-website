import type { PageServerLoad } from './$types';
import { findRow, getSheet } from '$lib/server/sheet';

import { type Option } from '$lib/types';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800 });

export const load = (async () => {
	let options: {
		tz: string | undefined;
		date: string | undefined;
		banner: string | undefined;
	} = cache.get('options') as any;
	if (options === undefined) {
		const sheet = await getSheet('Options');
		options = {
			tz: (await findRow<Option>(sheet, 'key', 'timezone'))?.get('value') || 'UTC',
			date: (await findRow<Option>(sheet, 'key', 'date'))?.get('value') || '2025-01-01 12:00:00',
			banner: (await findRow<Option>(sheet, 'key', 'banner_photo'))?.get('value') || 'photos/banner.jpg'
		};
		cache.set('options', options);
	}
	return options;
}) satisfies PageServerLoad;
