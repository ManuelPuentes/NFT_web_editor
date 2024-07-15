<script lang="ts">
	import { onMount } from 'svelte';
	import Moveable from 'svelte-moveable';
	import {
		context_menu,
		moveablea_ref,
		assets_details,
		workspace_details,
		changes_indicator,
		last_selected_item_id,
		canvas_ref
	} from '$stores/web_app_state';

	import type { MoveableBounds } from '../../interfaces/BoundingRect';
	import type { AssetDetails } from '../../interfaces/AssetDetails';
	import type MoveableComponent from 'svelte-moveable';
	import { DimensionViewable } from '$lib/moveable-able';

	export let data: AssetDetails;

	let targetRef: HTMLElement;
	let moveableRef: MoveableComponent;
	const scalable = true;
	const draggable = true;
	const snappable = true;
	const rotatable = true;
	const keepRatio = true;
	const edgeDraggable = false;
	const throttleDrag = 1;
	const throttleScale = 0;
	const startDragRotate = 0;
	const throttleDragRotate = 0;

	let id = 'id';
	let is_mouse_over = false;
	let bounds: MoveableBounds = { left: 0, top: 0, right: 0, bottom: 0 };

	const handleMouseOver = () => {
		is_mouse_over = true;
	};

	const handleMouseOut = () => {
		is_mouse_over = false;
	};

	const handleClick = (e: MouseEvent) => {
		e.stopPropagation();
		$context_menu.status = false;
		$last_selected_item_id = id;
	};

	const rightClickContextMenu = (e: MouseEvent) => {
		$last_selected_item_id = id;

		context_menu.set({
			status: true,
			pos: {
				x: e.clientX,
				y: e.clientY
			}
		});

		moveablea_ref.set(moveableRef);
	};

	onMount(() => {
		bounds = $workspace_details;
		id = `${data.directory_name}_${data.file_name}`;
		// $assets_details[data.directory_name][data.file_name].styles
	});
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<img
	alt={id}
	{id}
	bind:this={targetRef}
	src={data.file_asset_path}
	style={$assets_details[data.directory_name][data.file_name].styles}
	on:click|preventDefault={handleClick}
	on:contextmenu|preventDefault={rightClickContextMenu}
	on:mouseover={handleMouseOver}
	on:focus={handleMouseOver}
	on:mouseout={handleMouseOut}
	on:blur={handleMouseOut}
/>

{#if is_mouse_over || $last_selected_item_id === id}
	<Moveable
		bind:this={moveableRef}
		target={targetRef}
		origin={false}
		{draggable}
		{rotatable}
		{throttleDrag}
		{edgeDraggable}
		{startDragRotate}
		{throttleDragRotate}
		{scalable}
		{keepRatio}
		{throttleScale}
		{snappable}
		{bounds}
		ables={[DimensionViewable]}
		props={{ dimensionViewable: true }}
		on:render={({ detail: e }) => {
			e.target.style.cssText += e.cssText;
			$assets_details[data.directory_name][data.file_name].styles = e.cssText;
		}}
		on:dragEnd={({ detail: { target, isDrag } }) => {
			if (isDrag) {
				const { x: canvas_x, y: canvas_y } = $canvas_ref.getBoundingClientRect();
				const { x: img_x, y: img_y } = target.getBoundingClientRect();
				const offset = { x: Math.round(img_x - canvas_x), y: Math.round(img_y - canvas_y) };
				$assets_details[data.directory_name][data.file_name].translate = {
					x: offset.x,
					y: offset.y
				};
				$changes_indicator = true;
			}
		}}
		on:scaleEnd={({ detail: { lastEvent } }) => {
			const regex = /scale\(([\d.]+), ([\d.]+)\)/;
			const match = lastEvent.transform.match(regex);

			if (match) {
				const scaleX = parseFloat(parseFloat(match[1]).toFixed(2));
				const scaleY = parseFloat(parseFloat(match[2]).toFixed(2));
				const { height, width } = targetRef.getBoundingClientRect();
				$assets_details[data.directory_name][data.file_name].scale = { x: scaleX, y: scaleY };
				$assets_details[data.directory_name][data.file_name].size = { height, width };
			}
			$changes_indicator = true;
		}}
		on:rotateEnd={({ detail: { lastEvent } }) => {
			const regex = /rotate\(([\d.]+)deg\)/;
			const match = lastEvent.transform.match(regex);

			if (match) {
				const rotationValue = parseFloat(parseFloat(match[1]).toFixed(2));
				$assets_details[data.directory_name][data.file_name].rotate = rotationValue;
			}
			$changes_indicator = true;
		}}
		on:bound={({ detail: e }) => {}}
	/>
{/if}

<style>
	img {
		position: absolute;
	}
</style>
