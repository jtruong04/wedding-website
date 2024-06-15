<script lang="ts">
	import { type Snippet } from 'svelte';

	const { children, img }: { children: Snippet; img: string } = $props();
</script>

<div class="hero fixed top-0 z-[-1] min-h-screen" style="background-image: url({img});">
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-center text-neutral-content">
		{@render children()}
	</div>
</div>
