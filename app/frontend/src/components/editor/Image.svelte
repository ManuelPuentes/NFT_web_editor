<script lang="ts">
	import { onMount } from 'svelte';
	import Moveable from 'svelte-moveable';
	import type MoveableComponent from 'svelte-moveable';
	import type InfiniteViewerComponent from 'svelte-infinite-viewer';

	// interfaces
	import type { AssetDetails } from '$interfaces/asset_details.interface';

	// stores
	import {
		use_mouse_drag,
		last_selected_item_id,
		assets_details,
		canvas_ref,
		context_menu,
		moveablea_ref
	} from '$stores/web_app_state';

	export let data: AssetDetails;
	export let viewerRef: InfiniteViewerComponent;
	let id: string;
	let img: HTMLElement;
	let moveableRef: MoveableComponent;
	let is_mouse_over = false;
	const bounds = { left: 0, top: 0, right: 0, bottom: 0 };

	const scrollOptions = {
		container: () => viewerRef.getContainer(),
		threshold: 20,
		getScrollPosition: () => {
			return [
				viewerRef.getScrollLeft({ absolute: true }),
				viewerRef.getScrollTop({ absolute: true })
			];
		}
	};
	onMount(() => {
		id = `${data.directory_name}_${data.file_name}`;
		img.style.cssText = $assets_details[data.directory_name][data.file_name].styles;
		img.onload = function () {
			if (!$assets_details[data.directory_name][data.file_name].size) {
				const { width, height } = img.getBoundingClientRect();
				$assets_details[data.directory_name][data.file_name].size = { width, height };
			}
		};
	});

	// events handlers
	const handleMouseOver = () => {
		is_mouse_over = true;
	};

	const handleMouseOut = () => {
		is_mouse_over = false;
	};

	const handleClick = (e: MouseEvent) => {
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
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<img
	alt={id}
	{id}
	src={data.file_asset_path}
	bind:this={img}
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
		scrollable={true}
		{scrollOptions}
		origin={false}
		target={img}
		draggable={true}
		resizable={true}
		rotatable={true}
		scalable={true}
		keepRatio={true}
		useResizeObserver={true}
		{bounds}
		on:render={({ detail: e }) => {
			e.target.style.cssText += e.cssText;
			$assets_details[data.directory_name][data.file_name].styles = e.target.style.cssText;
		}}
		on:dragStart={({ detail: e }) => {
			$use_mouse_drag = false;
		}}
		on:scaleStart={({ detail: e }) => {
			$use_mouse_drag = false;
		}}
		on:rotateStart={({ detail: e }) => {
			$use_mouse_drag = false;
		}}
		on:resizeStart={({ detail: e }) => {
			$use_mouse_drag = false;
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
			}

			$use_mouse_drag = true;
		}}
		on:resizeEnd={({ detail: { lastEvent } }) => {
			const { width, height } = lastEvent;
			$assets_details[data.directory_name][data.file_name].size = { height, width };
			$use_mouse_drag = true;
		}}
		on:rotateEnd={({ detail: { lastEvent } }) => {
			const rotationValue = lastEvent.rotate.toFixed(2);
			$assets_details[data.directory_name][data.file_name].rotate = rotationValue;
			$use_mouse_drag = true;
		}}
		on:scroll={({ detail: { direction } }) => {
			viewerRef.scrollBy(direction[0] * 10, direction[1] * 10);
		}}
	></Moveable>
{/if}

<style>
	img {
		position: absolute;
	}
</style>
