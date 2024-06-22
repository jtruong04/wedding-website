<script lang="ts">
	import NotchedInput from '$lib/components/NotchedInput.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Control, Description, Field, FieldErrors, Label } from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { Guest } from '$lib/types';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Confirm from './Confirm.svelte';
	import { schema, type Message } from './schema.js';
	import UnderlineSelect from '$lib/components/UnderlineSelect.svelte';

	const {
		data,
		rsvp,
		guest,
		guest_of
	}: {
		data: SuperValidated<Infer<typeof schema>, Message>;
		rsvp?: Guest;
		guest?: Guest;
		guest_of?: Guest;
	} = $props();

	let submitting = $state(false);

	const form = superForm(data, {
		validators: zodClient(schema),
		dataType: 'json',
		resetForm: false,
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
	const { form: formData, enhance, message } = form;

	$effect(() => {
		if (rsvp) {
			$formData.full_name = rsvp.fullName;
			$formData.is_coming = rsvp.isComing;
			$formData.plus_one = rsvp.plusOne;
			$formData.guest_name = guest ? guest.fullName : '';
			$formData.email_confirm = Boolean(rsvp.email);
			$formData.email = rsvp.email;
			$formData.notes = rsvp.notes;
		}
	});
</script>

{#if $message}
	<Confirm rsvp={$message.rsvp} guest={$message.guest}/>
{:else}
	<div class="mb-5 text-center">
		{#if !guest_of && !rsvp}
			<p>Thank you for your RSVP!</p>
		{:else if rsvp && !guest_of}
			<p>Hi {rsvp.fullName}! Thank you for your RSVP!</p>
		{:else if rsvp && guest_of}
			<p>Hi {rsvp.fullName}! You've been invited as the guest of {guest_of.fullName}.</p>
		{/if}
		<p>Please fill out the form below to confirm your attendance.</p>
	</div>
	<form method="POST" use:enhance class="my-5 flex flex-col gap-1">
		<Field {form} name="full_name">
			<Control let:attrs>
				<NotchedInput autofocus label="Full Name" {...attrs} bind:value={$formData.full_name} />
			</Control>
			<Description class="sr-only">Full Name</Description>
			<FieldErrors />
		</Field>
		<div class="flex flex-wrap whitespace-nowrap">
			<Field {form} name="is_coming" class="flex items-center">
				<Control let:attrs>
					<Label class="sr-only">Are you coming?</Label>
					<span>I &nbsp;</span>
					<Select.Root
						selected={{
							value: $formData.is_coming,
							label: $formData.is_coming === 'TRUE' ? 'will' : 'will not'
						}}
						onSelectedChange={(v) => {
							v && ($formData.is_coming = v.value);
							if (v && v.value === 'FALSE') {
								$formData.guest_name = '';
								$formData.plus_one = 'FALSE';
							}
						}}
					>
						<Select.Trigger {...attrs} class="mx-2 w-auto min-w-[100px]">
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="TRUE">will</Select.Item>
							<Select.Item value="FALSE">will not</Select.Item>
						</Select.Content>
					</Select.Root>
					<p>&nbsp; be attending</p>
					{#if $formData.is_coming === 'FALSE' || guest_of}
						<span>.</span>
					{/if}
				</Control>
				<FieldErrors />
			</Field>
			{#if $formData.is_coming === 'TRUE' && !guest_of}
				<Field {form} name="plus_one" class="flex items-center">
					<Control let:attrs>
						<Label class="sr-only">Are you bringing someone?</Label>
						<span>&nbsp;and I&nbsp;</span>
						<Select.Root
							selected={{
								value: $formData.plus_one,
								label: $formData.plus_one === 'TRUE' ? 'will' : 'will not'
							}}
							onSelectedChange={(v) => {
								v && ($formData.plus_one = v.value);
								if (v && v.value === 'FALSE') {
									$formData.guest_name = '';
								}
							}}
						>
							<Select.Trigger {...attrs} class="mx-2 w-auto min-w-[100px]">
								<Select.Value />
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="TRUE">will</Select.Item>
								<Select.Item value="FALSE">will not</Select.Item>
							</Select.Content>
						</Select.Root>
						<span>&nbsp; be bringing someone.</span>
					</Control>
					<FieldErrors />
				</Field>
			{/if}
		</div>
		{#if $formData.is_coming === 'TRUE' && !guest_of}
			{#if $formData.plus_one === 'TRUE'}
				<Field {form} name="guest_name" class="mt-4">
					<Control let:attrs>
						<NotchedInput label="Guest's Name" {...attrs} bind:value={$formData.guest_name} />
					</Control>
					<Description class="sr-only">Guest's Name</Description>
					<FieldErrors />
				</Field>
			{/if}
		{/if}
		{#if $formData.is_coming === 'TRUE'}
			<Field {form} name="notes">
				<Control let:attrs>
					<Description class="mt-3">
						Please let us know of any accommodations you may need during the reception in order to
						have the best time.
					</Description>
					<Textarea
						{...attrs}
						bind:value={$formData.notes}
						class="focus:border-current focus:ring-0"
						placeholder="Dietary restrictions, accessibility requirements, etc."
					/>
				</Control>
				<FieldErrors />
			</Field>
		{/if}
		<div class="flex items-center gap-2 mt-2">
			<Field {form} name="email_confirm">
				<Control let:attrs>
					<div class="flex items-center space-x-2">
						<Checkbox {...attrs} bind:checked={$formData.email_confirm} />
						<Label
							class="w-max text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Send me an email confirmation.
						</Label>
					</div>
				</Control>
				<FieldErrors />
			</Field>
			{#if $formData.email_confirm}
				<Field {form} name="email" class="w-full">
					<Control let:attrs>
						<NotchedInput label="Email" {...attrs} bind:value={$formData.email} />
					</Control>
					<FieldErrors />
				</Field>
			{/if}
		</div>

		<Button class="w-full" type="submit" disabled={submitting}>
			{#if submitting}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				Saving your response
			{:else}
				Submit
			{/if}
		</Button>
	</form>
{/if}

<SuperDebug data={$formData} />
