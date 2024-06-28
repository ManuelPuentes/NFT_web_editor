<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import { last_selected_item, assets_details, changes_indicator } from '$stores/web_app_state';

	let directory: string = '';
	let file: string = '';

	onMount(() => {
		[directory, file] = $last_selected_item.id.split('_');
	});

	export const fit_into_canvas = () => {
		reset_styles();
		const canvas = window.document.getElementById('canvas')?.getBoundingClientRect();
		const element = window.document.getElementById($last_selected_item.id)?.getBoundingClientRect();

		if (!canvas || !element) return;

		const { width: canvas_width, height: canvas_height } = canvas;
		const { width: element_width, height: element_height } = element;

		if (canvas_width >= element_width && canvas_height >= element_height) return;

		const resize_axis = canvas_width > canvas_height ? 'height' : 'width';

		let scale = 1;

		switch (resize_axis) {
			case 'height':
				scale = canvas_height / element_height;
				break;

			case 'width':
				scale = canvas_width / element_width;
				break;
		}

		update_styles({
			new_scale: scale
		});
	};

	const reset_styles = () => {
		let value = $assets_details[directory][file];

		$assets_details[directory][file] = {
			...value,
			scale: '',
			rotate: '',
			styles: '',
			transform: ''
		};
	};

	const update_styles = ({ new_scale }: { new_scale: number }) => {
		let value = $assets_details[directory][file];

		const scale = `scale(${new_scale.toFixed(2)})`;
		const styles = `transform: ${scale}`;
		$assets_details[directory][file] = {
			...value,
			styles,
			scale
		};

		$changes_indicator = true;

	};
</script>

<Button
	on:click={fit_into_canvas}
	color="dark"
	outline
	class="dark:hover:bg-[--primary_hover_color] dark:text-white w-[100%]"
>
	<span class="fa-solid fa-down-left-and-up-right-to-center mr-2" />
	Fit into canvas
</Button>
