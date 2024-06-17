<script lang="ts">
	import RsvpForm from './RsvpForm.svelte';
	const { data } = $props();

</script>

<div class="w-3/4">
	<RsvpForm data={data.form} {...data} />
</div>
