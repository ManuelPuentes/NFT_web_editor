<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	import { Input, Button, Spinner, Alert, Label } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	import FileInput from './FileInput.svelte';

	export let data: any;

	const { form, errors, enhance, constraints, submitting } = superForm(data);
</script>

<form
	method="POST"
	use:enhance
	action="?/createCollection"
	enctype="multipart/form-data"
	class="
	m-4 flex h-[50%] w-[60%]
	max-w-[600px] flex-col items-center
	gap-5 overflow-y-auto
	bg-white p-4 text-gray-900 dark:bg-slate-800
	dark:text-white
"
>
	<caption
		class="w-[100%] text-pretty p-5 text-left text-lg font-semibold
		text-gray-900
		dark:text-white
		"
	>
		Create Collection
		<p class="mt-1 text-pretty text-sm font-normal text-gray-500 dark:text-gray-400">
			Create a new collection project, set all rules to draw and start generating batches.
		</p>
	</caption>
	<Label for="collection_name" class=" self-start">Collection Name</Label>
	<Input
		id="collection_name"
		placeholder="Awesome Name"
		size="lg"
		bind:value={$form.collectionName}
		{...$constraints.collectionName}
		name="collectionName"
	/>

	<Label for="collection_name" class=" self-start">Collection assets</Label>
	<FileInput
		bind:value={$form.collectionAssets}
		{...$constraints.collectionAssets}
		text_content="Click to upload or drag and drop your zip file with the collection assets here!"
		name="collectionAssets"
		accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
	/>

	{#if $errors._errors}
		<Alert border color="dark">
			<InfoCircleSolid slot="icon" class="size-5" />
			<span class="font-medium">Alert!</span>
			{$errors._errors}
		</Alert>
	{/if}

	{#if $errors.collectionAssets}
		<Alert border color="dark">
			<InfoCircleSolid slot="icon" class="size-5" />
			<span class="font-medium">Alert!</span>
			{$errors.collectionAssets}
		</Alert>
	{/if}

	{#if $errors.collectionName}
		<Alert border color="dark">
			<InfoCircleSolid slot="icon" class="size-5" />
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
