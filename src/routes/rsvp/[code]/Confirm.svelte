<script lang="ts">
	import type { Message } from './schema';
	import { Button } from '$lib/components/ui/button';

	const { rsvp, guest }: Message = $props();
</script>

<div class="prose flex flex-col justify-center items-center">
	{#if rsvp.isComing === 'FALSE'}
		<p>We're sorry you can't come to the wedding and celebrate with us.</p>
	{:else}
		<p>We're super excited to have you join us!</p>
	{/if}

	<div>Your confirmation code is</div>

	<div
		class="m-4 w-[350px] self-center rounded-lg border bg-card p-6 text-center text-card-foreground shadow-sm"
	>
		<Button variant="link" href="/rsvp/{rsvp.id}" class="text-5xl">
			{rsvp.id.toUpperCase()}
		</Button>
	</div>

	{#if rsvp.plusOne && guest}
		<div>and your guest {guest.fullName}'s code is</div>

		<div
			class="m-4 w-[350px] self-center rounded-lg border bg-card p-6 text-center text-card-foreground shadow-sm"
		>
			<Button variant="link" href="/rsvp/{guest.id}" class="text-5xl">
				{guest.id.toUpperCase()}
			</Button>
		</div>
	{/if}
	<p>You can use {guest ? 'these codes' : 'this code'} to update your response at any time!</p>
	<Button variant="link" href="/">Return home</Button>
</div>
