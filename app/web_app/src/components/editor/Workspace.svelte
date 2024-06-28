<script lang="ts">
	import Moveable from 'svelte-moveable';
	import {
		draw_order,
		canvas_size,
		selected_items,
		workspace_details,
		last_selected_item_id
	} from '$stores/web_app_state';

	import { onMount } from 'svelte';
	import Image from './Image.svelte';
	import ImageContextMenu from './ImageContextMenu.svelte';

	import type { MoveableBounds } from '../../interfaces/BoundingRect';
	import type { AssetDetails } from '../../interfaces/AssetDetails';
	import { DimensionViewable } from '$lib/moveable-able';

	import { setCanvasSize, getCanvasSize } from '$lib/api/canvas-size';

	export let collection_name = '';

	const canvas_id = 'canvas';

	let canvas: HTMLElement;
	let workspace: HTMLElement;
	let bounds: MoveableBounds = { left: 0, top: 0, right: 0, bottom: 0 };

	let images_data = [];

	onMount(async () => {
		const { left, top, right, bottom } = workspace.getBoundingClientRect();
		bounds = { left, top, right, bottom };
		$workspace_details = bounds;

		await loadCanvasSize({ collection_name });
		canvas.style.height = `${$canvas_size.height}px`;
		canvas.style.width = `${$canvas_size.width}px`;
	});

	const loadCanvasSize = async ({ collection_name }: { collection_name: string }) => {
		const result = (await getCanvasSize({ collection_name })).data;

		if (result) {
			$canvas_size = result;
		}
		return $canvas_size;
	};

	const handleCanvasClick = () => {
		$last_selected_item_id = canvas_id;
	};

	const drawImagesOrder = (drawOrder: string[], selectedItems: Record<string, AssetDetails>) => {
		let order: Array<AssetDetails> = [];

		drawOrder.map((element) => {
			if (selectedItems[element]) {
				order.push(selectedItems[element]);
			}
		});

		return order;
	};

	$: images_data = drawImagesOrder($draw_order, $selected_items);

	const throttleDragRotate = 0;
	const scalable = true;
	const throttleScale = 0;
	const snappable = true;
</script>

<div
	class="
		w-[80%]
		flex justify-center items-center
	"
	bind:this={workspace}
	id="workspace"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		id={canvas_id}
		class="
			dark:bg-[repeating-linear-gradient(0deg,black_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,black_0_1px,transparent_1px_20px)] dark:bg-slate-700
			bg-[repeating-linear-gradient(0deg,black_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,black_0_1px,transparent_1px_20px)] bg-slate-100
			!transform-none
			flex items-center justify-center
    	"
		bind:this={canvas}
		on:click={handleCanvasClick}
		on:keypress={handleCanvasClick}
	>
		{#each images_data as data (data.file_asset_path)}
			<Image {data} />
		{/each}
	</div>

	<ImageContextMenu />

	{#if $last_selected_item_id === canvas_id}
		<Moveable
			target={canvas}
			origin={false}
			resizable={true}
			ables={[DimensionViewable]}
			props={{ dimensionViewable: true }}
			{throttleDragRotate}
			{scalable}
			{throttleScale}
			{snappable}
			{bounds}
			on:render={({ detail: e }) => {
				e.target.style.cssText += e.cssText;
			}}
			on:resizeEnd={({ detail: e }) => {

				if (e.lastEvent) {
					setCanvasSize({
						collection_name,
						size: {
							height: e.lastEvent.height,
							width: e.lastEvent.width
						}
					});
				}
			}}
			on:bound={({ detail: e }) => {}}
		/>
	{/if}
</div>
