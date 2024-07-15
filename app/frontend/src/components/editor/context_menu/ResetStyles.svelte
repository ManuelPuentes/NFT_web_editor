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

	const reset_styles = () => {
		let value = $assets_details[directory][file];

		const { clientHeight, clientWidth } = $moveablea_ref.getTargets()[0];
		const { height, width } = $moveablea_ref.getTargets()[0].getBoundingClientRect();

		const offsetWidth = clientWidth - width;
		const offsetHeight = clientHeight - height;

		$moveablea_ref.request('scalable', { offsetWidth, offsetHeight }, true);

		$assets_details[directory][file] = {
			...value,
			styles: '',
			scale: null,
			rotate: null,
			translate: null,
			size: { height: clientHeight, width: clientWidth }
		};

		update_stores();
	};

	const update_stores = () => {
		$changes_indicator = true;
		$context_menu.status = false;
		$selected_items[directory] = $assets_details[directory][file];
		$last_selected_item_id = '';
	};
</script>

<Button
	on:click={reset_styles}
	color="dark"
	outline
	class="w-[100%] dark:text-white dark:hover:bg-[--primary_hover_color]"
>
	<span class="fa-solid fa-down-left-and-up-right-to-center mr-2" />
	Reset Styles
</Button>
