<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import Menu from 'lucide-svelte/icons/menu';
	import Drawer from '$lib/components/Drawer.svelte';
	import NavMenu from '$lib/components/NavMenu.svelte';
	import { ModeWatcher } from 'mode-watcher';

	import '../app.css';
	import { page } from '$app/stores';
	import Lightswitch from '$lib/components/Lightswitch.svelte';

	const { children } = $props();

	const links: { name: string; href: string }[] = [
		{ name: 'Gallery', href: '/gallery' },
		// { name: 'Hotels', href: '/hotels' },
		// { name: 'Registry', href: '/registry' },
		{ name: 'FAQs', href: '/faqs' }
	];
</script>

<ModeWatcher />
<div class="fixed z-[100] bottom-0 right-0 m-2">
	<Lightswitch />
</div>

<Drawer>
	{#snippet content({ toggleDrawer })}
		<div class="navbar w-full ps-5">
			<div class="flex-none md:hidden" class:text-white={$page.route.id === '/'}>
				<button onclick={toggleDrawer} name='menu'>
					<Menu />
				</button>
			</div>
			{#if !($page.route.id === '/')}
				<div class="script-font mx-2 flex-1 px-2"><a href="/">John and Jessica</a></div>
			{/if}
			<div class="ml-auto hidden md:block" class:text-white={$page.route.id === '/'}>
				<NavMenu direction="horizontal" {links} />
			</div>
		</div>
		<div class="prose mx-auto flex max-w-screen-lg flex-col items-center p-5">
			{@render children()}
		</div>
	{/snippet}
	{#snippet sidebar({ toggleDrawer })}
		<NavMenu direction="vertical" {links} onclick={toggleDrawer} />
	{/snippet}
</Drawer>
