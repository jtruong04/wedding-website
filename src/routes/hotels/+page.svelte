<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Rating } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { Carousel } from 'flowbite-svelte';

	const { data } = $props();
	const { hotels, venue_details, maps_key, hotel_text } = data;

	// @ts-ignore
	onMount(async () => {
		// @ts-ignore
		// prettier-ignore
		(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
            key: maps_key,
            v: "weekly",
        });

		let map;

		// The location of Uluru
		const position = {
			lat: venue_details.location.latitude,
			lng: venue_details.location.longitude
		};

		// Request needed libraries.
		//@ts-ignore
		const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
		// @ts-ignore
		const { AdvancedMarkerElement, PinElement } = (await google.maps.importLibrary(
			'marker'
			// @ts-ignore
		)) as google.maps.MarkerLibrary;
		// The map, centered at Uluru
		map = new Map(document.getElementById('map') as HTMLElement, {
			zoom: 15,
			center: position,
			mapId: 'f7499d4ca631cf48'
		});

        const glyphImg = document.createElement('img');
        glyphImg.src = 'icons/gem.svg';


		// @ts-ignore
		const pinElement = new PinElement({
			background: venue_details.iconBackgroundColor,
			glyph: glyphImg
		});

		// The marker, positioned at Uluru
		const marker = new AdvancedMarkerElement({
			map: map,
			position: position,
			content: pinElement.element,
			title: venue_details.displayName.text
		});

		hotels.forEach((hotel) => {
			const position = {
				lat: hotel.location.latitude,
				lng: hotel.location.longitude
			};

			const pinElement = new PinElement({
				background: hotel.iconBackgroundColor,
				glyph: new URL(String(hotel.iconMaskBaseUri + '.svg'))
			});

			const marker = new AdvancedMarkerElement({
				map: map,
				position: position,
				content: pinElement.element,
				title: hotel.name
			});
		});
	});
</script>

<div class="flex flex-col gap-2 w-full">
	<h1 class="script-font mb-5 text-3xl self-center">Hotels</h1>
	<p class="self-center text-lg">{hotel_text}</p>

	<div
		class="flex w-full snap-x snap-mandatory gap-0 overflow-x-auto scroll-auto md:justify-center md:gap-1 py-10"
	>
		<div class="shrink-0 md:hidden">
			<div class="w-4 shrink-0 sm:w-48"></div>
		</div>
		{#each hotels as hotel}
			<div
				class="hotel-card card card-compact w-5/6 shrink-0 snap-center shadow-xl first:pl-8 last:pr-8 dark:bg-neutral-900 md:w-[30%]"
			>
				<Carousel
					let:Indicators
					class="!h-60"
					duration={Math.random() * 7500 + 5000}
					images={hotel.photos.map((photo) => {
						return {
							src: `https://places.googleapis.com/v1/${photo?.name}/media?&maxHeightPx=400&key=${maps_key}`,
							alt: hotel.displayName.text,
                            loading: "lazy"
						};
					})}
				>
                    <!-- <Controls />    -->
					<Indicators />
				</Carousel>

				<div class="card-body">
					<h2 class="card-title"><a href={hotel.websiteUri}>{hotel.name}</a></h2>
					<Rating total={5} rating={hotel.rating} class="self-end">
						<p slot="text" class="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">
							{hotel.rating} out of 5
						</p>
					</Rating>
					<a href={hotel.googleMapsUri} class="text-sm">{hotel.formattedAddress}</a>
					<p class="text-lg">{hotel.editorialSummary.text}</p>
					<div class="card-actions justify-end">
						<Button href={hotel.booking_url} class="btn btn-primary">Book Now</Button>
					</div>
				</div>
			</div>
		{/each}
		<div class="shrink-0 md:hidden">
			<div class="w-4 shrink-0 sm:w-48"></div>
		</div>
	</div>

	<div id="map" class="w-full md:w-4/5 self-center"></div>
</div>

<style>
	@media (min-width: 768px) {
		div.hotel-card:nth-child(even) {
			scale: 0.90;
		}
	}

	#map {
		height: 400px; /* The height is 400 pixels */
		color: black;
	}
</style>
