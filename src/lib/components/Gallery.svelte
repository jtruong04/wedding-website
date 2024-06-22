<script lang="ts">
	import type { MediaItem } from '$lib/types';
	import type { BiggerPictureInstance } from 'bigger-picture';
	import { onMount } from 'svelte';
	import { loadBp } from '$lib/load-bp';

	const {
		images
	}: {
		images: MediaItem[];
	} = $props();

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

<div class="masonry my-5 w-full">
	{#each images as image}
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
