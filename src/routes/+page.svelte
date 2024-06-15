<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import { DateTime } from 'luxon';

	const date = '10/5/2024, 6:00 PM';
	const tz = 'America/New_York';
</script>

<Hero img="photos/banner.jpg">
	<div class="flex flex-col items-center">
		<h1 class="script-font text-shadow mb-[5rem] text-6xl font-bold text-white">
			John and Jessica
		</h1>
		<div class="mb-2 text-xl">
			{DateTime.fromFormat(date, 'f', { zone: tz }).toFormat('EEEE, MMMM dd, t')}
		</div>
		<div class="text-white">
			<Countdown {date} timezone={tz} show_seconds={true} />
		</div>
	</div>
</Hero>

<style>
	h1 {
		text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
	}
</style>
