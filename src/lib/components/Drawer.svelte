<script lang="ts">
	import type { Snippet } from 'svelte';

	const {
		content,
		sidebar
	}: {
		content: Snippet<[{ toggleDrawer: () => void }]>;
		sidebar: Snippet<[{ toggleDrawer: () => void }]>;
	} = $props();

	let visible = $state(false);

	const toggleDrawer = () => {
		visible = !visible;
	};
</script>

<div class="drawer">
	<input id="sidebar" type="checkbox" class="drawer-toggle" bind:checked={visible} />
	<div class="drawer-content">
		{@render content({ toggleDrawer })}
	</div>
	<div class="drawer-side">
		<label for="sidebar" aria-label="close sidebar" class="drawer-overlay !cursor-default"></label>
		{@render sidebar({ toggleDrawer })}
	</div>
</div>
