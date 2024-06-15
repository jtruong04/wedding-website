import type { PageServerLoad } from './$types';
import { findRow, getSheet } from '$lib/server/sheet';

import { type Option } from '../types';

export const load = (async () => {
	const sheet = await getSheet('Options');

	return {
		tz: (await findRow<Option>(sheet, 'Key', 'timezone'))?.get('Value') || 'UTC',
		date: (await findRow<Option>(sheet, 'Key', 'date'))?.get('Value') || '2025-01-01 12:00:00'
	};
}) satisfies PageServerLoad;
