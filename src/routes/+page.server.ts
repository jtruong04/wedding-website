import type { PageServerLoad } from './$types';
import { findRow, getSheet } from '$lib/server/sheet';

import { type Option } from '$lib/types';

export const load = (async () => {
	const sheet = await getSheet('Options');

	return {
		tz: (await findRow<Option>(sheet, 'key', 'timezone'))?.get('value') || 'UTC',
		date: (await findRow<Option>(sheet, 'key', 'date'))?.get('value') || '2025-01-01 12:00:00',
		banner: (await findRow<Option>(sheet, 'key', 'banner_photo'))?.get('value') || 'photos/banner.jpg'
	};
}) satisfies PageServerLoad;
