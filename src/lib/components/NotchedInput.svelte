<script lang="ts">
	let {
		label,
		value = $bindable(),
		disabled = false,
		...rest
	}: {
		label: string;
		value: string;
		disabled?: boolean;
	} = $props();
</script>

<div class="group relative">
	<input
		type="text"
		{...rest}
		{disabled}
		bind:value
		class="peer w-full bg-background px-3 py-3 outline-none"
		placeholder=""
	/>
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label
		class="pointer-events-none absolute left-[9px] top-px z-[2] -translate-y-1/2 transform px-1 text-sm text-muted-foreground transition-all duration-300
	group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-foreground peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl"
		>{label}</label
	>

	<!--This fieldset+legend is used for the the border and notch transition-->
	<fieldset
		class="invisible pointer-events-none absolute inset-0 mt-[-9px] rounded-md border border-input group-focus-within:border-2
	group-focus-within:!text-foreground group-focus-within:outline-none
	peer-placeholder-shown:visible"
	>
		<legend
			class="invisible ml-2 max-w-[0.01px] whitespace-nowrap px-0 text-sm transition-all duration-300 group-focus-within:max-w-full group-focus-within:px-1"
			>{label}</legend
		>
	</fieldset>

	<!--This fieldset+legend always has a notch and is shown when the input is filled, instead of the other, so the notch doesnt vanish when you unfocus the field-->
	<fieldset
		class="pointer-events-none visible absolute inset-0 mt-[-9px] rounded-md border border-input group-focus-within:border-2
	group-focus-within:!text-foreground group-focus-within:outline-none
	peer-placeholder-shown:visible"
	>
		<legend class="invisible ml-2 max-w-full whitespace-nowrap px-1 text-sm">{label}</legend>
	</fieldset>
</div>
