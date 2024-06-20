import type { PageServerLoad } from './$types';
import { type Option } from '$lib/types';

import { GOOGLE_MAPS_API_KEY } from '$env/static/private';
import { findRow, getSheet } from '$lib/server/sheet';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1800 });

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
	let hotels:Hotel[]|undefined = cache.get('hotels');
	if (hotels === undefined) {
		const sheet = await getSheet('Hotels');
		hotels = (await sheet.getRows<Hotel>()).map((row) => row.toObject()) as Hotel[];
		cache.set('hotels', hotels);
	}

	const place_details: Place[] = await Promise.all(
		hotels.map(async (hotel) => {
			const res = cache.get(hotel.place_id!);
			if (res) return res as Place;
			let response = await fetch(
				`https://places.googleapis.com/v1/places/${hotel.place_id!}?` +
					new URLSearchParams({
						key: GOOGLE_MAPS_API_KEY,
						fields:
							'id,displayName,location,formattedAddress,googleMapsUri,priceLevel,rating,websiteUri,photos,editorialSummary,iconBackgroundColor,iconMaskBaseUri'
					})
			);
			let data = await response.json();
			cache.set(hotel.place_id!, data);
			return data;
		})
	);

	// Venue
	let venue_id: string | undefined = cache.get('venue_id');
	if (venue_id === undefined) {
		venue_id = (await findRow<Option>('Options', 'key', 'venue_id'))?.get('value');
		cache.set('venue_id', venue_id);
	}
	let venue_data: Place = cache.get(venue_id!) as Place;
	if (venue_data === undefined) {
		const venue_details = await fetch(
			`https://places.googleapis.com/v1/places/${venue_id}?` +
				new URLSearchParams({
					key: GOOGLE_MAPS_API_KEY,
					fields:
						'id,displayName,location,formattedAddress,googleMapsUri,priceLevel,rating,websiteUri,photos,editorialSummary,iconBackgroundColor,iconMaskBaseUri'
				})
		);
		venue_data = await venue_details.json();
		cache.set(venue_id!, venue_data);
	}

	return {
		hotels: place_details.map((place, i) => ({ ...place, ...hotels[i] })) as (Place & Hotel)[],
		maps_key: GOOGLE_MAPS_API_KEY,
		venue_details: venue_data as Place,
		hotel_text: (await findRow<Option>('Options', 'key', 'hotels_text'))?.get('value') || ''
	};
}) satisfies PageServerLoad;
