import type { RequestHandler } from './$types';

import { getPagedAlbum } from '$lib/server/album';

export const POST: RequestHandler = async ({ request }) => {
	const { token } = await request.json();
	return new Response(JSON.stringify(await getPagedAlbum(token)));
};
