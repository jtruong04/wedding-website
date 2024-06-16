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

<div class="relative group">
	<input
		type="text"
		{...rest}
		disabled={disabled}
		bind:value
		class="w-full outline-none px-3 py-3 peer bg-background"
		placeholder=""
	/>
	<!-- svelte-ignore a11y_label_has_associated_control -->
	<label
		class="z-[2] pointer-events-none absolute left-[9px] top-px -translate-y-1/2 transform px-1 text-sm text-muted-foreground transition-all duration-300
	group-focus-within:!top-px group-focus-within:!text-sm group-focus-within:!text-foreground peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-xl"
		>{label}</label
	>

	<!--This fieldset+legend is used for the the border and notch transition-->
	<fieldset class="inset-0 absolute border border-input rounded-md pointer-events-none mt-[-9px] invisible peer-placeholder-shown:visible 
	group-focus-within:!text-foreground group-focus-within:border-2
	group-focus-within:outline-none">
	  <legend class="ml-2 px-0 text-sm transition-all duration-300 invisible max-w-[0.01px] group-focus-within:max-w-full group-focus-within:px-1 whitespace-nowrap">{label}</legend>
	</fieldset>

	<!--This fieldset+legend always has a notch and is shown when the input is filled, instead of the other, so the notch doesnt vanish when you unfocus the field-->
	<fieldset class="inset-0 absolute border border-input rounded-md pointer-events-none mt-[-9px] visible peer-placeholder-shown:visible 
	group-focus-within:!text-foreground group-focus-within:border-2
	group-focus-within:outline-none">
	  <legend class="ml-2 text-sm invisible px-1 max-w-full whitespace-nowrap">{label}</legend>
	</fieldset>
</div>
