<script lang="ts">
	import Form from '$lib/Form.svelte';
	import { Input, Dropzone, Button, Spinner } from 'flowbite-svelte';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	let submited = false;

	const { form, errors, constraints } = superForm(data.form);

	let value: any = [];
	const dropHandle = (event: any) => {
		value = [];
		event.preventDefault();
		if (event.dataTransfer.items) {
			[...event.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					// value.push(file.name);
					value = file.name;
				}
			});
		} else {
			[...event.dataTransfer.files].forEach((file, i) => {
				value = file.name;
			});
		}
	};

	const handleChange = (event: any) => {
		const files = event.target.files;
		if (files.length > 0) {
			value = files[0].name;
		}
	};
</script>

<Form
	data={data.form}
	invalidateAll={false}
	action="?/createCollection"
	class="
	max-w-[700px] w-[80vw]  
	flex flex-col items-center 
	py-5 px-10 
	my-5
	"
	let:message
	let:superform
>
	<caption
		class="p-5 text-lg font-semibold text-left w-[100%]
		text-gray-900 bg-white
		dark:text-white dark:bg-gray-800
		"
	>
		Create Collection
		<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
			Create a new collection project, set all rules to draw and start generating batches.
		</p>
	</caption>

	<Input
		placeholder="Large input"
		class="w-[60%] my-2"
		size="lg"
		bind:value={$form.collectionName}
		name="collectionName"
		{...$constraints.collectionName}
	/>

	{#if $errors.collectionName}
		<small>
			{$errors.collectionName}
		</small>
	{/if}

	<Dropzone
		id="dropzone"
		on:drop={dropHandle}
		on:dragover={(event) => {
			event.preventDefault();
		}}
		on:change={handleChange}
		bind:value={$form.collectionAssets}
		name="collectionAssets"
		accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
		class="w-[60%] my-2"
		enctype="multipart/form-data"

	>
		<svg
			aria-hidden="true"
			class="mb-3 w-10 h-10 text-gray-400"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
			/></svg
		>
		{#if value.length === 0}
			<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
				<span class="font-semibold">Click to upload</span> or drag and drop
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">ZIP</p>
		{:else}
			<p>{value}</p>
		{/if}
	</Dropzone>

	{#if $errors.collectionAssets}
		<small>
			{$errors.collectionAssets}
		</small>
	{/if}

	<Button type="submit" color="light" class="my-2 dark:color-primary max-w-[30%]">send</Button>
</Form>

