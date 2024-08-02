<script lang="ts">
	import { context_menu, last_selected_item_id } from '$stores/web_app_state';
	import FitIntoCanvas from './context_menu_items/FitIntoCanvas.svelte';
	import ResetStyles from './context_menu_items/ResetStyles.svelte';

	$: pos = $context_menu.pos;
</script>

{#if $context_menu.status}
	<div
		style="top:{pos.y}px; left:{pos.x}px"
		class="absolute z-[5000] flex flex-col gap-3 rounded-xl p-4 text-center dark:bg-[--background_color]"
		id="navbar"
	>
		<span class="p-1 font-extrabold">{$last_selected_item_id.replace('_', ' ')}</span>

		<ul>
			<FitIntoCanvas />
			<ResetStyles />
		</ul>
	</div>
{/if}

<svelte:window
	on:click={() => {
		$context_menu.status = false;
	}}
/>
