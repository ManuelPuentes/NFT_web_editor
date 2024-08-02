<script lang="ts">
	import { onMount } from 'svelte';

	import ResizeInIcon from '$icons/resize.in.icon.svelte';

	import {
		last_selected_item_id,
		assets_details,
		context_menu,
		selected_items,
		moveablea_ref
	} from '$stores/web_app_state';
	import type { AssetDetails } from '$interfaces/asset_details.interface';

	let directory: string = '';
	let file: string = '';

	onMount(() => {
		[directory, file] = $last_selected_item_id.split('_');
	});

	export const fit_into_canvas = () => {
		reset_styles();

		const canvas = window.document.getElementById('canvas');
		const element = window.document.getElementById($last_selected_item_id);

		if (!canvas || !element) return;

		const { width: canvas_width, height: canvas_height } = canvas.getBoundingClientRect();

		const { width: element_width, height: element_height } = element.getBoundingClientRect();

		// if (element_width >= canvas_width && element_height >= canvas_height) return;

		const resize_axis = element_width > element_height ? 'width' : 'height';

		switch (resize_axis) {
			case 'height':
				const deltaHeight = canvas_height - element_height;
				$moveablea_ref.request('scalable', { deltaWidth: 0, deltaHeight }, true);
				break;

			case 'width':
				const deltaWidth = canvas_width - element_width;
				$moveablea_ref.request('scalable', { deltaWidth, deltaHeight: 0 }, true);
				break;
		}

		update_stores();
	};

	const reset_styles = () => {
		let value = $assets_details[directory][file];

		const default_value: AssetDetails = {
			...value,
			styles: '',
			scale: { x: 0, y: 0 },
			rotate: 0,
			translate: { x: 0, y: 0 },
			size: { width: 0, height: 0 }
		};

		$assets_details[directory][file] = default_value;
	};

	const update_stores = () => {
		$selected_items[directory] = $assets_details[directory][file];
		$context_menu.status = false;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
	on:click={fit_into_canvas}
	class="flex gap-2 p-2 hover:bg-slate-200 dark:hover:bg-[--primary_color]"
>
	<ResizeInIcon class="inline" /> Fit into canvas
</li>
