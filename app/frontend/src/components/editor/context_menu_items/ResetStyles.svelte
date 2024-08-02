<script lang="ts">
	import { onMount } from 'svelte';

	import ResetIcon from '$icons/reset.icon.svelte';

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

	const reset_styles = () => {
		let value = $assets_details[directory][file];

		let target = $moveablea_ref.getTargets()[0];

		target.style.cssText = '';

		const default_value: AssetDetails = {
			...value,
			styles: '',
			scale: { x: 0, y: 0 },
			rotate: 0,
			translate: { x: 0, y: 0 },
			size: { width: 0, height: 0 }
		};

		update_stores({ default_value });
	};

	const update_stores = ({ default_value }: { default_value: AssetDetails }) => {
		$context_menu.status = false;
		$assets_details[directory][file] = default_value;
		$selected_items[directory] = default_value;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
	on:click={reset_styles}
	class="flex gap-2 p-2 hover:bg-slate-200 dark:hover:bg-[--primary_color]"
>
	<ResetIcon class="inline" /> Reset Styles
</li>
