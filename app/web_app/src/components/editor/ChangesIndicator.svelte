<script lang="ts">
	import { Indicator, Spinner } from 'flowbite-svelte';
	import { changes_indicator, assets_details } from '$stores/web_app_state';

	function handleKeydown(event: KeyboardEvent) {
		const { ctrlKey, key } = event;

		if (ctrlKey && key === 's' && $changes_indicator) {
			event.preventDefault();

			save_changes_promise = saveChanges();
			$changes_indicator = false;
		}
	}

	async function saveChanges() {
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		const raw = JSON.stringify({ assets_details: $assets_details });

		const requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: raw
		};

		const response = await fetch(
			`http://localhost:3000/collection/asset-datails?name=${collectionName}`,
			requestOptions
		);

		if (response.ok) {
			return await response.text();
		} else {
			throw new Error('Request failed');
		}
	}

	export let collectionName: string;

	let save_changes_promise: Promise<any>;
</script>

<svelte:window on:keydown={handleKeydown} />

{#await save_changes_promise}
	<span class="text-sm absolute left-[21%] mt-6 flex flex-wrap items-center">
		<Spinner size="3" class="mt-[1px]" />
		&nbsp saving
	</span>
{:then response}
	{#if $changes_indicator}
		<span class=" text-sm absolute left-[21%] mt-6 flex flex-wrap items-center">
			<Indicator size="sm" class="ml-[1px]" />
			&nbsp unsaved
		</span>
	{/if}
{:catch error}
	<span class=" text-sm absolute left-[21%] mt-6 flex flex-wrap items-center">
		<Indicator size="sm" class="ml-[1px] bg-red-500" />
		&nbsp {error}
	</span>
{/await}
