import type { PageServerLoad } from './$types';

import { GOOGLE_MAPS_API_KEY } from '$env/static/private';
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
	const hotels:Hotel[] = [
		{
			name: "Hyatt Place",
			place_id: "ChIJcWhuCHJz04kRX_YOZzNgHoo",
			booking_url: "https://www.hyatt.com/shop/rooms/bufza?location=Hyatt%20Place%20Buffalo%2FAmherst&checkinDate=2024-10-05&checkoutDate=2024-10-06&rooms=1&adults=1&kids=0&rate=Standard"
		},
		{
			name: "The Mosey Hotel",
			place_id: "ChIJyblYn3pz04kRGdZpL4CESr0",
			booking_url: "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=BUFWLUP&arrivalDate=2024-10-05&departureDate=2024-10-06&room1NumAdults=1"
		},
		{
			name: "Hampton Inn",
			place_id: "ChIJ2dnkz31z04kR3k1N_j_cTSs",
			booking_url: "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=BUFWVHX&arrivalDate=2024-10-05&departureDate=2024-10-06&room1NumAdults=1"
		}
	];

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
			data.photos = data.photos.slice(0, 5);
			cache.set(hotel.place_id!, data);
			return data;
		})
	);

	// Venue
	let venue_id: string = "ChIJxZcEtnFz04kRMzWCJjRb3-U";
	let venue_data: Place = cache.get(venue_id) as Place;
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
	};
}) satisfies PageServerLoad;
