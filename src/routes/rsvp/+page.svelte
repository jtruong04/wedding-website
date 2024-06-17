<script lang="ts">
	import PasscodeForm from './PasscodeForm.svelte';

	const { data } = $props();

</script>

<PasscodeForm data={data.form} />
