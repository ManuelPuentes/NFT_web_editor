<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ResetStyles from './context_menu/ResetStyles.svelte';
	import FitIntoCanvas from './context_menu/FitIntoCanvas.svelte';

	import { context_menu, last_selected_item_id } from '$stores/web_app_state';

	let pos: { x: number; y: number } = { x: 0, y: 0 };
	let menu: { h: number; w: number } = { h: 0, w: 0 };

	$: pos = $context_menu.pos;

	const getContextMenuDimension = (node: any) => {
		let height = node.offsetHeight;
		let width = node.offsetWidth;
		menu = {
			h: height,
			w: width
		};
	};

	function onPageClick(e: any) {
		$context_menu.status = false;
	}
</script>

{#if $context_menu.status}
	<nav
		use:getContextMenuDimension
		style="top:{pos.y}px; left:{pos.x}px"
		class="absolute z-[5000] dark:bg-[--background_color] rounded-lg border dark:border-[--border_color]"
	>
		<div class="p-1 mt-2 mb-2 text-base text-center" id="navbar">
			{$last_selected_item_id}
			<ul>
				<li class="text-base p-1">
					<FitIntoCanvas />
				</li>
				<li class="text-base p-1">
					<ResetStyles />
				</li>
			</ul>
		</div>
	</nav>
{/if}

<svelte:window on:click={onPageClick} />
