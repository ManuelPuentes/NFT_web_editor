<script lang="ts">
	import Moveable from 'svelte-moveable';

	import {
		draw_order,
		selected_items,
		workspace_details,
		last_selected_item
	} from '../../stores/web_app_state';

	import { onMount } from 'svelte';

	import Image from './Image.svelte';

	import type { MoveableBounds } from '../../interfaces/BoundingRect';
	import type { AssetDetails } from '../../interfaces/AssetDetails';

	const canvas_id = 'canvas';

	let workspace: HTMLElement;
	let canvas: HTMLElement;
	let bounds: MoveableBounds = { left: 0, top: 0, right: 0, bottom: 0 };

	let images_data = [];

	onMount(() => {
		const workspace_rect: DOMRect = workspace.getBoundingClientRect();

		$workspace_details['workspace_bounding_rect'] = workspace_rect;

		const { left, top, right, bottom } = workspace_rect;
		bounds = { left, top, right, bottom };
	});
	const handleClick = () => {
		last_selected_item.set({ id: canvas_id, context_menu: false });
	};

	$: images_data = drawImagesOrder($draw_order, $selected_items);

	const drawImagesOrder = (drawOrder: string[], selectedItems: Record<string, AssetDetails>) => {
		let order: Array<AssetDetails> = [];

		drawOrder.map((element) => {
			if (selectedItems[element]) {
				order.push(selectedItems[element]);
			}
		});

		return order;
	};

	const DimensionViewable = {
		name: 'dimensionViewable',
		props: [],
		events: [],
		render(moveable: any, React: any) {
			const rect = moveable.getRect();
			return React.createElement(
				'div',
				{
					key: 'dimension-viewer',
					className: 'moveable-dimension',
					style: {
						position: 'absolute',
						left: `${rect.width / 2}px`,
						top: `${rect.height + 20}px`,
						background: '#4af',
						borderRadius: '2px',
						padding: '2px 4px',
						color: 'white',
						fontSize: '13px',
						whiteSpace: 'nowrap',
						fontWeight: 'bold',
						willChange: 'transform',
						transform: `translate(-50%, 0px)`
					}
				},
				[
					'\n            ',
					Math.round(rect.offsetWidth),
					' x ',
					Math.round(rect.offsetHeight),
					'\n        '
				]
			);
		}
	};
</script>

<div
	class="
  w-[80%] h-[100%]
  flex justify-center items-center
  border dark:border-[--border_color]
"
	bind:this={workspace}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="
      w-[1280px] h-[720px]
      dark:bg-[repeating-linear-gradient(0deg,black_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,black_0_1px,transparent_1px_20px)] dark:bg-slate-700
	    bg-[repeating-linear-gradient(0deg,black_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,black_0_1px,transparent_1px_20px)] bg-slate-100
      !transform-none
    "
		id={canvas_id}
		bind:this={canvas}
		on:click={handleClick}
		on:keypress={handleClick}
	>
		{#each images_data as data (data.file_asset_path)}
			<Image {data} />
		{/each}
	</div>
</div>
<Moveable
	target={canvas}
	ables={[DimensionViewable]}
	resizable={true}
	origin={false}
	{bounds}
	props={{ dimensionViewable: true }}
	on:resize={({ detail: e }) => {
		e.target.style.width = `${e.width}px`;
		e.target.style.height = `${e.height}px`;
		e.target.style.transform = e.drag.transform;
	}}
	on:bound={({ detail: e }) => {}}
/>
