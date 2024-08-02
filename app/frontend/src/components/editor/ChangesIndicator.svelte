<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Indicator, Spinner } from 'flowbite-svelte';

	import { assets_details, draw_order } from '$stores/web_app_state';
	import { setAssetsDetails } from '$lib/api/assets-details';
	import { setDrawOrder } from '$lib/api/draw-order';
	import type { AssetDetails } from '$interfaces/asset_details.interface';

	async function handleKeydown(event: KeyboardEvent) {
		const { ctrlKey, key } = event;

		if (
			ctrlKey &&
			key === 's' &&
			(assets_details_changes_indicator || draw_order_changes_indicator)
		) {
			event.preventDefault();
			//api call here
			if (assets_details_changes_indicator && draw_order_changes_indicator) {
				save_changes_promise = Promise.all([
					setAssetsDetails({
						assets_details: $assets_details,
						collection_name
					}),
					setDrawOrder({
						draw_order: $draw_order,
						collection_name
					})
				]);

				assets_details_hash = await hashValue(JSON.stringify($assets_details));
				draw_order_hash = await hashValue(JSON.stringify($draw_order));

				draw_order_changes_indicator = false;
				assets_details_changes_indicator = false;
			} else {
				if (assets_details_changes_indicator) {
					save_changes_promise = setAssetsDetails({
						assets_details: $assets_details,
						collection_name
					});

					assets_details_hash = await hashValue(JSON.stringify($assets_details));
					assets_details_changes_indicator = false;
				}

				if (draw_order_changes_indicator) {
					save_changes_promise = setDrawOrder({
						draw_order: $draw_order,
						collection_name
					});

					draw_order_hash = await hashValue(JSON.stringify($draw_order));
					draw_order_changes_indicator = false;
				}
			}
		}
	}

	export let collection_name: string;
	export let data: Record<string, Record<string, AssetDetails>>;
	export let draw_order_data: Array<string>;
	let assets_details_hash: string;
	let draw_order_hash: string;
	let draw_order_changes_indicator = false;
	let assets_details_changes_indicator = false;
	let save_changes_promise: Promise<any>;

	const hashValue = async (val: any) => {
		const view = new DataView(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(val)));
		const hexes = [];
		for (let i = 0; i < view.byteLength; i += 4) {
			hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
		}
		return hexes.join('');
	};

	const unsubscribe = assets_details.subscribe(async (value) => {
		if (Object.keys(value).length === 0 || !assets_details_hash) return;

		const store_hash = await hashValue(JSON.stringify(value));

		if (store_hash == assets_details_hash) {
			assets_details_changes_indicator = false;
			return;
		}

		assets_details_changes_indicator = true;
	});

	const draw_order_unsubscribe = draw_order.subscribe(async (value) => {
		if (Object.keys(value).length === 0 || !draw_order_hash) return;

		const store_hash = await hashValue(JSON.stringify(value));

		if (store_hash == draw_order_hash) {
			draw_order_changes_indicator = false;
			return;
		}

		draw_order_changes_indicator = true;
	});

	onMount(async () => {
		assets_details_hash = await hashValue(JSON.stringify(data));
		draw_order_hash = await hashValue(JSON.stringify(draw_order_data));
	});

	onDestroy(() => {
		unsubscribe();
		draw_order_unsubscribe();
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#await save_changes_promise}
	<span class={$$restProps.class}>
		<Spinner size="3" class="mr-1" />
		Saving
	</span>
{:then response}
	{#if assets_details_changes_indicator || draw_order_changes_indicator}
		<span class={$$restProps.class}>
			<Indicator size="sm" class="mr-1" />
			unsaved
		</span>
	{/if}
{:catch error}
	<span class={$$restProps.class}>
		<Indicator size="sm" class="mr-1 bg-red-500" />
		&nbsp {error}
	</span>
{/await}
