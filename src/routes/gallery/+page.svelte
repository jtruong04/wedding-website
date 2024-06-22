<script lang="ts">
	// import Gallery from '$lib/components/Gallery.svelte';
	import type { MediaItem } from '$lib/types';

	let { data } = $props();

	let photos = $state(data.photos);
	let nextPageToken = $state(data.nextPageToken);

	const fetchMore = async () => {
		const response = await fetch('/api/gallery', {
			method: 'POST',
			body: JSON.stringify({ token: nextPageToken }),
			headers: {
				'content-type': 'application/json'
			}
		});
		const newData = await response.json();
		newData.mediaItems.forEach((photo: MediaItem) => {
			photo.srcset = [512, 1024, 2048].map((size) => `${photo.baseUrl}=w${size} ${size}w`);
			photo.srcset.push(`${photo.baseUrl}=w${photo.mediaMetadata.width} ${4096}w`);
		});
		photos = [...photos, ...newData.mediaItems];
		nextPageToken = newData.nextPageToken;
	};

	import type { BiggerPictureInstance } from 'bigger-picture';
	import { onMount } from 'svelte';
	import { loadBp } from '$lib/load-bp';

	let bp: BiggerPictureInstance;

	/** click handler */
	function openBiggerPicture(e: Event) {
		e.preventDefault();
		const target = e.currentTarget as HTMLAnchorElement;
		bp.open({
			items: document.querySelectorAll('.masonry a'),
			el: target
		});
	}

	onMount(async () => {
		// use onMount to define variable so it runs only in the browser
		bp = await loadBp();
	});
</script>

<h1 class="script-font mb-5 text-3xl">Gallery</h1>
<p>These are photos that we wanted to share with you all. This is the story of us.</p>

<div class="masonry my-5 w-full">
	{#each photos as image}
		<a
			class="masonry-brick"
			onclick={openBiggerPicture}
			href={image.baseUrl}
			data-img={image.srcset?.join(',') || image.baseUrl}
			data-thumb={`${image.baseUrl}=h250`}
			data-height={image.mediaMetadata.height}
			data-width={image.mediaMetadata.width}
			data-alt={image.description || image.filename}
			data-caption={image.description}
			data-media-id={image.id}
		>
			<img
				id={image.id}
				src={`${image.baseUrl}=w380`}
				alt={image.description || image.filename}
				loading="lazy"
			/>
		</a>
	{/each}
</div>
{#if nextPageToken}
	<button onclick={fetchMore}>Load More Photos</button>
{/if}

<p>
	Want to add your own photos here? Reach out to either of us and we can let you upload your own
	photos!
</p>


<style>
	.masonry {
		display: flex;
		flex-flow: row wrap;
		gap: 8px;
		width: 100%;
	}

	.masonry-brick {
		flex: auto;
		height: 250px;
		min-width: 150px;
		overflow: hidden;
		border-radius: 5px;
		color: white;
		position: relative;
	}

	img {
		height: 250px;
		width: 100%;
		object-fit: cover;
	}
</style>
