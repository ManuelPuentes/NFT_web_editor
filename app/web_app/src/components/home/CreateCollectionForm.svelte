<script lang="ts">
	import Form from '$lib/Form.svelte';
	import { Input, Dropzone, Button, Spinner, Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, errors, constraints, submitting } = superForm(data.form, {
		async onSubmit() {
			await new Promise((r) => setTimeout(r, delaySubmit));
		}
	});

	let value: any = [];
	const dropHandle = (event: any) => {
		value = [];
		event.preventDefault();
		if (event.dataTransfer.items) {
			[...event.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
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
	flex flex-col items-center gap-5
	w-[60%] max-w-[700px] h-[45%]
	p-4 m-4
	text-gray-900 bg-white dark:text-white dark:bg-slate-800
	"
	let:message
	let:superform
>
	<caption
		class="
		text-lg font-semibold text-left
		w-[100%]
		text-gray-900 dark:text-white
	"
	>
		Create Collection
		<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
			Create a new collection project, set all rules to draw and start generating batches.
		</p>
	</caption>
	<Input
		placeholder="Collection Name"
		size="lg"
		bind:value={$form.collectionName}
		name="collectionName"
		{...$constraints.collectionName}
	/>

	<Dropzone
		id="dropzone"
		on:drop={dropHandle}
		on:dragover={(event) => {
			event.preventDefault();
		}}
		on:change={handleChange}
		bind:value={$form.collectionAssets}
		name="collectionAssets"
		class="w-[60%] "
		enctype="multipart/form-data"
		accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
		{...$constraints.collectionAssets}
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

	{#if $errors._errors}
		<Alert border color="dark">
			<InfoCircleSolid slot="icon" class="w-5 h-5" />
			<span class="font-medium">Alert!</span>
			{$errors._errors}
		</Alert>
	{/if}

	{#if $errors.collectionAssets}
		<Alert border color="dark">
			<InfoCircleSolid slot="icon" class="w-5 h-5" />
			<span class="font-medium">Alert!</span>
			{$errors.collectionAssets}
		</Alert>
	{/if}

	<Button type="submit" color="light" class=" dark:color-primary max-w-[30%] mt-auto">send</Button>
</Form>
