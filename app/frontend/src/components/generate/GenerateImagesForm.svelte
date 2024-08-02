<script lang="ts">
	import { onMount } from 'svelte';
	import { Alert, Button, Label, Range, Spinner } from 'flowbite-svelte';
	import InfoIcon from '$icons/info.icon.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	export let data: any;
	const { form, errors, enhance, constraints, submitting } = superForm(data);

	onMount(() => {
		$form.imagesAmount = 5;
	});
</script>

<form
	method="POST"
	use:enhance
	action="?/generateImages"
	class="
	m-5
	flex w-[60%] max-w-[600px]
	flex-col items-center gap-5 p-4
	text-gray-900 dark:bg-gray-800
	dark:text-white

"
>
	<Label for="images_amount" class=" self-start">How many images you want to generate?</Label>

	<Range
		id="images_amount"
		size="sm"
		class="w-[80%]"
		min="0"
		max="20"
		bind:value={$form.imagesAmount}
		{...$constraints.imagesAmount}
		name="imagesAmount"
	/>

	<p class="mt-1 text-pretty text-sm font-normal text-gray-500 dark:text-gray-400">
		{$form.imagesAmount}
	</p>

	{#if $errors._errors}
		<Alert border color="dark">
			<InfoIcon />
			<span class="font-medium">Alert!</span>
			{$errors._errors}
		</Alert>
	{/if}

	{#if $errors.imagesAmount}
		<Alert border color="dark">
			<InfoIcon />
			<span class="font-medium">Alert!</span>
			{$errors.collectionAssets}
		</Alert>
	{/if}

	{#if $errors.collectionName}
		<Alert border color="dark">
			<InfoIcon />
			<span class="font-medium">Alert!</span>
			{$errors.collectionName}
		</Alert>
	{/if}

	{#if $submitting}
		<Spinner size="6" class="mt-auto" />
	{:else}
		<Button type="submit" color="light" class=" dark:color-primary mt-auto max-w-[30%]">send</Button
		>
	{/if}
</form>
