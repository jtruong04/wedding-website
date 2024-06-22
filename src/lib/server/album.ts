import NodeCache from 'node-cache';

import {
	GOOGLE_PHOTOS_ALBUM_ID,
	GOOGLE_PHOTOS_CLIENT_ID,
	GOOGLE_PHOTOS_CLIENT_SECRET,
	GOOGLE_PHOTOS_REFRESH_TOKEN,
	GOOGLE_PHOTOS_REFRESH_URL
} from '$env/static/private';
import type { MediaItem } from '$lib/types';


const cache = new NodeCache({ stdTTL: 1800 });

async function refreshAccessToken() {
	let token = cache.get('access_token');
	if (token === undefined) {
		const response = await fetch(GOOGLE_PHOTOS_REFRESH_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				client_id: GOOGLE_PHOTOS_CLIENT_ID,
				client_secret: GOOGLE_PHOTOS_CLIENT_SECRET,
				refresh_token: GOOGLE_PHOTOS_REFRESH_TOKEN
			})
		});
		const data = await response.json();
		token = data.access_token;
		cache.set('access_token', token);
	}
	return token;
}

export async function getAlbum() {
    let images = cache.get('images') as MediaItem[] | undefined;
    if (images === undefined || images.length === 0) {
        const params = new URLSearchParams({
            albumId: GOOGLE_PHOTOS_ALBUM_ID,
            pageSize: "100",
        });
        const token = await refreshAccessToken();
        let pageToken = null;
        images = [];
        do {
            if (pageToken) {
                params.set('pageToken', pageToken);
            }
            const response = await fetch(
                'https://photoslibrary.googleapis.com/v1/mediaItems:search?' + params,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            pageToken = data.nextPageToken;
            images = images.concat(data.mediaItems);
        } while (pageToken);
        cache.set('images', images);
    }
    return images || [];
}

export async function getPagedAlbum(pageToken: string|null = null, pageSize: number = 25) {
    let images = cache.get('images_'+pageToken) as {mediaItems: MediaItem[], nextPageToken?:string} | undefined;
    if (images === undefined ) {
        const params = new URLSearchParams({
            albumId: GOOGLE_PHOTOS_ALBUM_ID,
            pageSize: pageSize.toString(),
        });
        if (pageToken) {
            params.set('pageToken', pageToken);
        }
        const token = await refreshAccessToken();
        const response = await fetch(
            'https://photoslibrary.googleapis.com/v1/mediaItems:search?' + params,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
        images = await response.json();
        cache.set('images_'+pageToken, images);
    }
    return images || {
        mediaItems: [] as MediaItem[],
    };
}