import { getSheet } from '$lib/server/sheet';
import type { FAQ } from '$lib/types';
import type { PageServerLoad } from './$types';

import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800 });


export const load = (async () => {
    let faqs = cache.get('faqs');
    if (faqs === undefined) {
        const sheet = await getSheet('FAQs');
        faqs = (await sheet.getRows<FAQ>()).map(row => row.toObject()) as FAQ[];
        cache.set('faqs', faqs);
    }
    return {
        faqs
    };
}) satisfies PageServerLoad;