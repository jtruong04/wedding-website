import type { PageServerLoad } from '../$types';

import {getAlbum} from '$lib/server/album';
import type { MediaItem } from '$lib/types';


export const load = (async () => {
    const photos:MediaItem[] = await getAlbum();

	photos.forEach((photo) => {
		photo.srcset = [512,1024,2048].map((size) => `${photo.baseUrl}=w${size} ${size}w`);
		photo.srcset.push(`${photo.baseUrl}=w${photo.mediaMetadata.width} ${4096}w`);
	});

	return {
        photos: photos,
    };
}) satisfies PageServerLoad;
