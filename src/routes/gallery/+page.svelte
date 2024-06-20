<script lang="ts">
	import Gallery from '$lib/components/Gallery.svelte';

	const { data } = $props();
</script>

<h1 class="script-font mb-5 text-3xl">Gallery</h1>
<p>These are photos that we wanted to share with you all. This is the story of us.</p>
<Gallery images={data.photos} />
<p>
	Want to add your own photos here? Reach out to either of us and we can let you upload your own
	photos!
</p>
