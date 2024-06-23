import type { PageLoad } from './$types';

export const load = (async () => {
	return {
		paypal_link: "https://paypal.me/jtruong04?country.x=US&locale.x=en_US",
		venmo_link: "https://www.venmo.com/jtruong04",
		zelle_email: "trucojo@gmail.com",
		zelle_phone: "(716) 392-4712",
	};
}) satisfies PageLoad;
