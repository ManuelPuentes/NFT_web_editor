<script lang="ts">
	import EyeIcon from '$icons/eye.icon.svelte';
	import EyeCloseIcon from '$icons/eye.close.icon.svelte';

	// stores
	import { selected_items, assets_details } from '$stores/web_app_state';
	import type { AssetDetails } from '$interfaces/asset_details.interface';

	let active_item = false;

	export let file_name;
	export let folder_name;

	$: active_item = $selected_items[folder_name] == $assets_details[folder_name][file_name];

	const handleClick = (e: MouseEvent) => {
		const current_trait_active_element: AssetDetails = $selected_items[folder_name];

		if (current_trait_active_element != $assets_details[folder_name][file_name]) {
			$selected_items[folder_name] = $assets_details[folder_name][file_name];
		} else {
			delete $selected_items[folder_name];
		}
		selected_items.set($selected_items);
	};
</script>

<div
	class="  m-1
  w-[100%]
  truncate
  p-4
  hover:bg-slate-200 dark:hover:bg-[--primary_color]"
>
	<button on:click|stopPropagation={handleClick} class="w-[100%] text-left">
		{#if active_item}
			<EyeIcon class="mr-2 inline" />
		{:else}
			<EyeCloseIcon class="mr-2 inline" />
		{/if}
		{file_name}
	</button>
</div>
