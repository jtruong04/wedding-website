<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	let {
		label,
		value = $bindable(),
		disabled = false,
		autofocus = false,
		...rest
	}: {
		label: string;
		value: string;
		disabled?: boolean;
		autofocus?: boolean;
	} = $props();
</script>

<div class="relative">
    <Input type="text" bind:value autofocus {...rest} class="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-1 border-input appearance-none focus:outline-none focus:ring-0 focus:border-current peer" placeholder=" " />
    <label for="floating_outlined" class="absolute text-sm text-muted-foreground duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-background px-2 peer-focus:px-2 peer-focus:text-foreground	peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{label}</label>
</div>
