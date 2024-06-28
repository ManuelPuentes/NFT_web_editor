<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import {
		last_selected_item_id,
		assets_details,
		changes_indicator,
		context_menu,
		selected_items
	} from '$stores/web_app_state';

	let directory: string = '';
	let file: string = '';

	onMount(() => {
		[directory, file] = $last_selected_item_id.split('_');
	});

	const reset_styles = () => {
		let value = $assets_details[directory][file];

		$assets_details[directory][file] = {
			...value,
			scale: '',
			rotate: '',
			styles: '',
			transform: ''
		};

		update_stores();
	};

	const update_stores = () => {
		$changes_indicator = true;
		$context_menu.status = false;
		$selected_items[directory] = $assets_details[directory][file];
	};
</script>

<Button
	on:click={reset_styles}
	color="dark"
	outline
	class="dark:hover:bg-[--primary_hover_color] dark:text-white w-[100%]"
>
	<span class="fa-solid fa-down-left-and-up-right-to-center mr-2" />
	Reset Styles
</Button>
