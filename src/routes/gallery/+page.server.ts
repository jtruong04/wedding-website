import type { PageServerLoad } from '../$types';
import {getPagedAlbum} from '$lib/server/album';


export const load = (async () => {
    const photos = await getPagedAlbum(null);
	
	photos.mediaItems.forEach((photo) => {
		photo.srcset = [512,1024,2048].map((size) => `${photo.baseUrl}=w${size} ${size}w`);
		photo.srcset.push(`${photo.baseUrl}=w${photo.mediaMetadata.width} ${4096}w`);
	});

	return {
        photos: photos.mediaItems,
		nextPageToken: photos.nextPageToken,
    };
}) satisfies PageServerLoad;
