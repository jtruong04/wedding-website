<script lang="ts">
  	import { Button } from "$lib/components/ui/button";

	const {
		direction,
		links,
		onclick
	}: {
		direction: 'vertical' | 'horizontal';
		links: { name: string; href: string }[];
		onclick?: () => void;
	} = $props();

	const horizontalClasses = 'menu menu-horizontal gap-2';
	const verticalClasses = 'menu menu-vertical p-4 w-80 min-h-full bg-base-200 flex flex-col gap-2';
</script>

<ul class={direction === 'horizontal' ? horizontalClasses : verticalClasses}>
	{#each links as { name, href }}
	<li>
		<Button variant="ghost">
			<a href={href} {onclick}>{name}</a>
		</Button>
	</li>
	{/each}

	<li class:order-first={direction === 'vertical'}>
		<Button >
			<a href="/rsvp" {onclick}>RSVP</a>
		</Button>
	</li>
</ul>

<style>
	.menu-vertical {
		background: hsl(var(--background) / var(--tw-bg-opacity));
	}
</style>
