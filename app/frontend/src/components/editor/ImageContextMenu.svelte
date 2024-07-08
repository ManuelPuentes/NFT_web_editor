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
		class="absolute z-[5000] rounded-lg border dark:border-[--border_color] dark:bg-[--background_color]"
	>
		<div class="mb-2 mt-2 p-1 text-center text-base" id="navbar">
			{$last_selected_item_id}
			<ul>
				<li class="p-1 text-base">
					<FitIntoCanvas />
				</li>
				<li class="p-1 text-base">
					<ResetStyles />
				</li>
			</ul>
		</div>
	</nav>
{/if}

<svelte:window on:click={onPageClick} />
