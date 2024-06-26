<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';

	const { data } = $props();
	const { groom_people, bride_people } = data;

</script>

{#snippet Card(person)}
	<div class={`card card-compact h-full overflow-hidden shadow-xl dark:bg-neutral-900`}>
		<div class="z-1 relative flex justify-center">
			<figure class="w-full">
				<img class="h-full w-full object-cover" src={person.photo} alt={person.name} />
			</figure>
			<div class="absolute bottom-0 overflow-visible">
				<h2
					class="text-shadow script-font text-4xl text-white"
					class:lg:text-6xl={person.level === 0}
					class:lg:text-5xl={person.level === 1}
				>
					{person.name}
				</h2>
			</div>
		</div>
		<div class="card-body">
			<h2
				class="card-title mt-[-0.75rem] flex flex-col items-center justify-center text-lg font-normal italic"
			>
				{person.title || "\xa0"}
			</h2>
			<p class="text-lg">{@html person.fun_fact}</p>
			<div class="text-md text-center align-text-bottom italic text-gray-500 dark:text-gray-400">
				{person.quote}
			</div>
		</div>
	</div>
{/snippet}

<h1 class="script-font mb-5 self-center text-3xl">About Us</h1>
<div class="w-full max-w-screen-lg">
	<Tabs.Root value="groom">
		<Tabs.List class="h-12 w-full">
			<Tabs.Trigger class="w-full text-lg" value="groom">Groom</Tabs.Trigger>
			<Tabs.Trigger class="w-full text-lg" value="bride">Bride</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="groom">
			<div
				class="tab-content flex w-full flex-col flex-wrap justify-evenly gap-4 md:flex-row md:gap-0"
			>
				{#each groom_people as person}
					<div
						class={`w-full p-2 ${person.level === 0 ? 'lg:w-full' : person.level === 1 ? 'lg:w-1/2' : person.level === 2 ? 'lg:w-1/3' : ''}`}
					>
						{@render Card(person)}
					</div>
				{/each}
			</div>
		</Tabs.Content>
		<Tabs.Content value="bride">
			<div
				class="tab-content flex w-full flex-col flex-wrap justify-evenly gap-4 md:flex-row md:gap-0"
			>
				{#each bride_people as person}
					<div
						class={`w-full p-2 ${person.level === 0 ? 'lg:w-full' : person.level === 1 ? 'lg:w-1/2' : person.level === 2 ? 'lg:w-1/3' : ''}`}
					>
						{@render Card(person)}
					</div>
				{/each}
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>

<style>
	.text-shadow {
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.85);
	}
</style>
