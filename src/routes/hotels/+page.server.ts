import type { PageServerLoad } from './$types';
import { type Option } from '$lib/types';

import { GOOGLE_MAPS_API_KEY } from '$env/static/private';
import { findRow, getSheet } from '$lib/server/sheet';

type Text = {
	text: string;
	languageCode: string;
};
type Photo = {
	name: string;
	heightPx: number;
	widthPx: number;
};
type Hotel = {
	name: string;
	place_id: string;
	booking_url: string;
};
type Place = {
	displayName: Text;
	location: {
		latitude: number;
		longitude: number;
	};
	editorialSummary: Text;
	formattedAddress: string;
	googleMapsUri: string;
	id: string;
	photos: Photo[];
	rating: number;
	websiteUri: string;
	iconBackgroundColor: string;
	iconMaskBaseUri: string;
};

export const load = (async () => {
	const sheet = await getSheet('Hotels');
	const hotels = (await sheet.getRows<Hotel>()).map((row) => row.toObject());

	const place_ids = [
		'ChIJ2dnkz31z04kR3k1N_j_cTSs',
		'ChIJyblYn3pz04kRGdZpL4CESr0',
		'ChIJcWhuCHJz04kRX_YOZzNgHoo'
	];

	const details = await Promise.all(
		place_ids.map((place_id) =>
			fetch(
				`https://places.googleapis.com/v1/places/${place_id}?` +
					new URLSearchParams({
						key: GOOGLE_MAPS_API_KEY,
						fields:
							'id,displayName,location,formattedAddress,googleMapsUri,priceLevel,rating,websiteUri,photos,editorialSummary,iconBackgroundColor,iconMaskBaseUri'
					})
			)
		)
	);
	const place_details: Place[] = await Promise.all(details.map((detail) => detail.json()));

	// Venue
	const venue_id = (await findRow<Option>('Options', 'key', 'venue_id'))?.get('value');
	const venue_details = await fetch(
		`https://places.googleapis.com/v1/places/${venue_id}?` +
			new URLSearchParams({
				key: GOOGLE_MAPS_API_KEY,
				fields:
					'id,displayName,location,formattedAddress,googleMapsUri,priceLevel,rating,websiteUri,photos,editorialSummary,iconBackgroundColor,iconMaskBaseUri'
			})
	);

	const venue_data = await venue_details.json();

	return {
		hotels: place_details.map((place, i) => ({ ...place, ...hotels[i] })) as (Place & Hotel)[],
		maps_key: GOOGLE_MAPS_API_KEY,
		venue_details: venue_data as Place,
		hotel_text: (await findRow<Option>('Options', 'key', 'hotels_text'))?.get('value') || ''
	};
}) satisfies PageServerLoad;
