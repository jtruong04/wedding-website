import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		tz: "America/New_York",
		date: "10/5/2024, 6:00 PM",
		banner: 'photos/banner.jpg'
	};;
}) satisfies PageLoad;
