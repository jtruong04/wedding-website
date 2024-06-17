import { getSheet } from '$lib/server/sheet';
import type { FAQ } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const sheet = await getSheet('FAQs');
    return {
        faqs: (await sheet.getRows<FAQ>()).map(row => row.toObject()) as FAQ[]
    };
}) satisfies PageServerLoad;