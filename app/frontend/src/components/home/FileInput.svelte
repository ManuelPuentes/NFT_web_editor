<script lang="ts">
	import type { InputConstraint } from 'sveltekit-superforms';
	import { Dropzone } from 'flowbite-svelte';

	export let value: any;
	export let text_content: string = 'Click to upload or drag and drop your file';
	export const errors: string[] | undefined = undefined;
	export let constraints: InputConstraint | undefined = undefined;

	const dropHandle = (event: any) => {
		event.preventDefault();
		if (event.dataTransfer.files) {
			const file = event.dataTransfer.files[0];
			value = file;
		} else {
			const item = event.dataTransfer.items[0];
			if (item.kind === 'file') {
				const file = item.getAsFile();
				value = file;
			}
		}
	};

	const handleChange = (event: any) => {
		const files = event.target.files;
		value = files[0];
	};
</script>

<Dropzone
	on:drop={dropHandle}
	on:dragover={(event) => {
		event.preventDefault();
	}}
	on:change={handleChange}
	on:focus={() => {}}
	bind:value
	{...constraints}
	{...$$restProps}
>
	{#if !value}
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
		<p class="text-sm text-balance text-center">
			{text_content}
		</p>
	{:else}
		<p>{value.name}</p>
	{/if}
</Dropzone>
