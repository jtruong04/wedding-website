<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { PinInput } from 'bits-ui';
	import { Control, Description, Field, FieldErrors, Label } from 'formsnap';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { PASSCODE_LENGTH, schema } from './schema.js';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	const {
		data
	}: {
		data: SuperValidated<Infer<typeof schema>>;
	} = $props();

	const form = superForm(data, {
		validators: zodClient(schema),
		dataType: 'json',
		onSubmit: () => {
			submitting = true;
		},
		onResult: ({result}) => {
			// Check for the type prevents button from resetting before redirecting
			// on success. It looks a little more seamless to redirect while the button
			// is still showing the spinner.
			if (result.type === 'failure') {
				submitting = false;
			}
		},
	});
	const { form: formData, enhance, errors } = form;

	let submitting = $state(false);
</script>

<form method="POST" use:enhance class="flex flex-col gap-4">
	<Field {form} name="passcode">
		<Description>Please enter the passcode you received on your invite!</Description>
		<Control let:attrs>
			<Label class="sr-only">Passcode</Label>
			<PinInput.Root
				{...attrs}
				bind:value={$formData.passcode}
				class="flex items-center justify-center gap-4"
				placeholder="_"
			>
				{#each { length: PASSCODE_LENGTH } as _, i}
					<PinInput.Input
						class={'h-input rounded-input font-alt placeholder-shown:border-border-input focus-within:border-border-input-hover focus-within:shadow-date-field-focus hover:border-border-input-hover flex w-11 select-none rounded border bg-background px-2 py-3 text-center text-[24px] uppercase tracking-[0.01em] text-foreground ' +
							($errors.passcode ? 'border-red-500' : 'border-foreground')}
					/>
				{/each}
				<PinInput.HiddenInput />
			</PinInput.Root>
		</Control>
		<FieldErrors />
	</Field>

	<Button type="submit" disabled={submitting}>
		{#if submitting}
			<LoaderCircle class="mr-2 h-4 w-4 animate-spin" /> 
			Checking your RSVP
		{:else}
			Submit
		{/if}
	</Button>
</form>
