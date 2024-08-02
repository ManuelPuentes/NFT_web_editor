<script lang="ts">
	import { onMount } from 'svelte';

	// stores
	import { canvas_size, canvas_ref } from '$stores/web_app_state';

	//lib
	import { getCanvasSize } from '$lib/api/canvas-size';

	let canvas: HTMLElement;

	onMount(async () => {
		$canvas_size = await getCanvasSize({ collection_name: 'luchamask' });
		canvas.style.height = `${$canvas_size.height}px`;
		canvas.style.width = `${$canvas_size.width}px`;

		$canvas_ref = canvas;
	});
</script>

<div class="viewport" bind:this={canvas} id="canvas">
	<slot />
</div>

<style>
	.viewport {
		width: 300px;
		height: 500px;
		background: #44475a;
		color: white;
	}
</style>
