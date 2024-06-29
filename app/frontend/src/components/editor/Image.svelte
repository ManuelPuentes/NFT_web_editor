<script lang="ts">
	import { onMount } from 'svelte';
	import Moveable from 'svelte-moveable';
	import {
		context_menu,
		assets_details,
		workspace_details,
		changes_indicator,
		last_selected_item_id
	} from '$stores/web_app_state';

	import type { MoveableBounds } from '../../interfaces/BoundingRect';

	export let data = {
		file_name: 'name',
		file_asset_path: 'path',
		directory_name: 'directory',
		styles: '',
		transform: '',
		scale: '',
		rotate: ''
	};

	let targetRef = null;
	let moveableRef = null;
	const scalable = true;
	const draggable = true;
	const snappable = true;
	const rotatable = true;
	const keepRatio = false;
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
	};

	onMount(() => {
		bounds = $workspace_details;
		id = `${data.directory_name}_${data.file_name}`;
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
		props={{ dimensionViewable: true }}
		on:render={({ detail: e }) => {
			e.target.style.cssText += e.cssText;
			$assets_details[data.directory_name][data.file_name].styles = e.cssText;
		}}
		on:drag={({ detail: e }) => {
			e.target.style.transform = e.transform;
			$assets_details[data.directory_name][data.file_name].transform = e.transform;
			$changes_indicator = true;
		}}
		on:scale={({ detail: e }) => {
			e.target.style.transform = e.drag.transform;
			$assets_details[data.directory_name][data.file_name].scale = e.drag.transform;
			$changes_indicator = true;
		}}
		on:rotate={({ detail: e }) => {
			e.target.style.transform = e.afterTransform;
			$assets_details[data.directory_name][data.file_name].rotate = e.afterTransform;
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
