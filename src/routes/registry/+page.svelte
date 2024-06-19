<script>
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Carousel } from 'flowbite-svelte';

	const { data } = $props();

	const images = [
		{ alt: 'Tokyo 1', src: 'images/registry/tokyo_1.webp' },
		{ alt: 'Tokyo 2', src: 'images/registry/tokyo_2.webp' },
		{ alt: 'Japan 1', src: 'images/registry/japan_1.jpg' },
		{ alt: 'Japan 2', src: 'images/registry/japan_2.webp' },
		{ alt: 'Japan 3', src: 'images/registry/japan_3.avif' }
	];
</script>

<h1 class="script-font mb-5 text-5xl">日本への新婚旅行</h1>
<div class="flex w-full flex-col gap-5">
	<div class="w-full">
		<Carousel {images} duration={5000} let:Controls>
			<Controls />
		</Carousel>
	</div>

	<p class="text-lg">
		{data.registry_text}
	</p>

	<div class="flex w-4/5 flex-col gap-4 self-center md:flex-row">
		<Button href={data.paypal_link} class="flex w-full gap-2 bg-[#CC9D2E]">
			<img src="icons/paypal.svg" alt="Paypal" class="h-8" />
		</Button>
		<Button href={data.venmo_link} class="flex w-full gap-2 bg-[#008cff]">
			<img src="icons/venmo.svg" alt="Venmo" class="h-5" />
		</Button>
		<Dialog.Root>
			<Dialog.Trigger asChild let:builder>
				<Button builders={[builder]} class="flex w-full gap-2 bg-[#5a1caa]">
					<img src="icons/zelle.svg" alt="Zelle" class="h-7" />
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title class="text-xl">Zelle</Dialog.Title>
					<Dialog.Description class="text-lg">
						<p class="mb-2">
							Hiya! Zelle doesn't provide a public link for us to share but if you'd like to
							contribute to our honeymoon fund through Zelle, you can send it to John's phone number
							or email address listed below.
						</p>
						<ul>
							<li><strong>Phone:</strong> {data.zelle_phone}</li>
							<li><strong>Email:</strong> {data.zelle_email}</li>
						</ul>
					</Dialog.Description>
				</Dialog.Header>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</div>

<style>
	.script-font {
		font-family: 'acgyosyo';
	}
</style>
