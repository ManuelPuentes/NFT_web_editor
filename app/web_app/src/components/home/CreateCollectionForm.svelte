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
	class="
	flex flex-col items-center gap-5
	w-[60%] max-w-[600px] h-[50%]
	p-4 m-4
	text-gray-900 bg-white dark:text-white dark:bg-slate-800
"
>
	<caption
		class="p-5 text-lg font-semibold text-left w-[100%]
		text-gray-900
		dark:text-white
		"
	>
		Create Collection
		<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400 text-balance">
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
		enctype="multipart/form-data"
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
		<Button type="submit" color="light" class=" dark:color-primary max-w-[30%] mt-auto">send</Button
		>
	{/if}
</form>
