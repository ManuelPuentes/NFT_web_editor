<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';

	import ResetStyles from './context_menu/ResetStyles.svelte';
	import FitIntoCanvas from './context_menu/FitIntoCanvas.svelte';

	import { last_selected_item } from '$stores/web_app_state';

	export let pos = { x: 0, y: 0 };

	let menu: { h: number; w: number };
	let browser: { h: number; w: number };
	let id: string;

	onMount(() => {
		browser = {
			w: window.innerWidth,
			h: window.innerHeight
		};

		if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
		if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
	});

	const getContextMenuDimension = (node: any) => {
		let height = node.offsetHeight;
		let width = node.offsetWidth;
		menu = {
			h: height,
			w: width
		};
		id = $last_selected_item.id.replace("_",": ");
	};
</script>

<nav
	use:getContextMenuDimension
	style="top:{pos.y}px; left:{pos.x}px"
	class="absolute z-[5000] dark:bg-[--background_color] rounded-lg border dark:border-[--border_color]"
>
	<div class="p-1 mt-2 mb-2 text-base text-center" id="navbar">
		{id}
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
