<script lang="ts">
	import { Indicator, Spinner } from 'flowbite-svelte';
	import { changes_indicator, assets_details, collection_name } from '$stores/web_app_state';

	import { setAssetsDetails } from '$lib/api/assets-details';

	function handleKeydown(event: KeyboardEvent) {
		const { ctrlKey, key } = event;

		if (ctrlKey && key === 's' && $changes_indicator) {
			event.preventDefault();

			save_changes_promise = setAssetsDetails({
				assets_details: $assets_details,
				collection_name: $collection_name
			});
			$changes_indicator = false;
		}
	}

	let save_changes_promise: Promise<any>;
</script>

<svelte:window on:keydown={handleKeydown} />

{#await save_changes_promise}
	<span class="absolute flex flex-wrap items-center self-start p-1 text-sm">
		<Spinner size="3" class="mr-1" />
		saving
	</span>
{:then response}
	{#if $changes_indicator}
		<span class="absolute flex flex-wrap items-center self-start p-1 text-sm">
			<Indicator size="sm" class="mr-1" />
			unsaved
		</span>
	{/if}
{:catch error}
	<span class="absolute flex flex-wrap items-center self-start p-1 text-sm">
		<Indicator size="sm" class="mr-1 bg-red-500" />
		&nbsp {error}
	</span>
{/await}
