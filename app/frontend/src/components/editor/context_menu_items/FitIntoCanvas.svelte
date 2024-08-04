<script lang="ts">
	import { onMount } from 'svelte';

	import ResizeInIcon from '$icons/resize.in.icon.svelte';

	import {
		last_selected_item_id,
		assets_details,
		context_menu,
		selected_items,
		moveablea_ref,
		canvas_ref
	} from '$stores/web_app_state';
	import type { AssetDetails } from '$interfaces/asset_details.interface';

	let directory: string = '';
	let file: string = '';

	onMount(() => {
		[directory, file] = $last_selected_item_id.split('_');
	});

	export const fit_into_canvas = () => {
		const canvas = $canvas_ref;
		const element = $moveablea_ref.getTargets()[0];

		if (!canvas || !element) return;

		const { width: canvas_width, height: canvas_height } = canvas.getBoundingClientRect();

		const { width: element_width, height: element_height } = element.getBoundingClientRect();

		// if (element_width >= canvas_width && element_height >= canvas_height) return;

		const resize_axis = element_width > element_height ? 'width' : 'height';

		switch (resize_axis) {
			case 'height':
				$moveablea_ref.request('resizable', { offsetHeight: canvas_height }, true);
				break;

			case 'width':
				$moveablea_ref.request('resizable', { offsetWidth: canvas_width }, true);
				break;
		}

		update_stores();
	};

	const update_stores = () => {
		const element = $moveablea_ref.getTargets()[0];

		const { width, height } = element.getBoundingClientRect();

		let value = $assets_details[directory][file];

		const default_value: AssetDetails = {
			...value,
			styles: '',
			scale: null,
			rotate: null,
			translate: null,
			size: { width, height }
		};

		$assets_details[directory][file] = default_value;
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
