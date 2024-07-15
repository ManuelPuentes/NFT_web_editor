<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import {
		last_selected_item_id,
		assets_details,
		changes_indicator,
		context_menu,
		selected_items,
		moveablea_ref
	} from '$stores/web_app_state';

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

		// if (canvas_width >= element_width && canvas_height >= element_height) return;

		const resize_axis = canvas_width > canvas_height ? 'width' : 'height';

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

		$assets_details[directory][file] = {
			...value,
			styles: '',
			scale: null,
			rotate: null,
			translate: null
		};
	};

	const update_stores = () => {
		$changes_indicator = true;
		$selected_items[directory] = $assets_details[directory][file];
		$context_menu.status = false;
	};
</script>

<Button
	on:click={fit_into_canvas}
	color="dark"
	outline
	class="w-[100%] dark:text-white dark:hover:bg-[--primary_hover_color]"
>
	<span class="fa-solid fa-down-left-and-up-right-to-center mr-2" />
	Fit into canvas
</Button>
