<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import { DateTime } from 'luxon';

	const {data} = $props();
	const {date, tz} = data;

</script>

<Hero img="photos/banner.jpg">
	<div class="flex flex-col items-center">
		<h1 class="script-font text-shadow mb-[5rem] text-6xl font-bold text-white">
			John and Jessica
		</h1>
		<h2 class="text-2xl">
			<a href="https://www.giancarlossteakhouse.com/">
				<p>
					Giancarlo's Cento Room <br/>
					5110 Main Street <br/>
					Williamsville NY, 14221
				</p>
			</a>
		</h2>
		<div class="mb-2 mt-5 text-xl">
			{DateTime.fromFormat(date, 'f', { zone: tz }).toFormat('EEEE, MMMM dd, t')}
		</div>
		<div class="text-white">
			<Countdown {date} timezone={tz} show_seconds={false} />
		</div>
	</div>
</Hero>

<style>
	h1 {
		text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
		font-weight: 200 !important;
		font-size: 6rem;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 3rem;
		}
	}

</style>
