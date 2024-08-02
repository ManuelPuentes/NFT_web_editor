<script lang="ts">
	import { onMount } from 'svelte';
	import InfiniteViewer from 'svelte-infinite-viewer';

	// components
	import Canvas from './Canvas.svelte';
	import Image from './Image.svelte';

	// stores
	import { viewer_ref, use_mouse_drag, selected_items, draw_order } from '$stores/web_app_state';

	// interfaces
	import type { AssetDetails } from '$interfaces/asset_details.interface';

	$: viewerRef = $viewer_ref;
	$: useMouseDrag = $use_mouse_drag;

	onMount(async () => {
		setTimeout(() => {
			viewerRef.scrollCenter();
		}, 100);
	});

	const drawImagesOrder = (draw_order: string[], selected_items: Record<string, AssetDetails>) => {
		let order: Array<AssetDetails> = [];

		draw_order.map((element) => {
			if (selected_items[element]) {
				order.push(selected_items[element]);
			}
		});

		return order;
	};

	$: images_data = drawImagesOrder($draw_order, $selected_items);
</script>

<InfiniteViewer className="viewer" bind:this={$viewer_ref} {useMouseDrag} useResizeObserver>
	<Canvas>
		{#each images_data as data (data.file_asset_path)}
			<Image {data} {viewerRef} />
		{/each}
	</Canvas>
</InfiniteViewer>

<style>
	:global(html),
	:global(body),
	:global(#app) {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	}
	:global(.viewer) {
		width: 100%;
		height: 100%;
	}
</style>
