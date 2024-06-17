<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';

	const { data } = $props();
	const { faqs } = data;
</script>

<h1 class="script-font text-2xl mb-3">Questions</h1>
<Accordion.Root class="w-full md:w-3/4">
	{#each faqs as { question, answer }}
		<Accordion.Item value={question}>
			<Accordion.Trigger class="text-lg">{question}</Accordion.Trigger>
			<Accordion.Content class="text-md">{answer}</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
