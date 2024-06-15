<script lang="ts">
	import { type Snippet } from 'svelte';

	const { children, img }: { children: Snippet; img: string } = $props();
</script>

<div class="hero fixed top-0 min-h-screen z-[-1]" style="background-image: url({img});">
	<div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-center text-neutral-content">
		{@render children()}
	</div>
</div>
