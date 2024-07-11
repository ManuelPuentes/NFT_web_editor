<script lang="ts">
	import { onMount } from 'svelte';
	import { draw_order, assets_details, collection_name } from '$stores/web_app_state';

	import Workspace from '$components/editor/Workspace.svelte';
	import Sidebar from '$components/editor/Sidebar.svelte';
	import ImageContextMenu from '$components/editor/ImageContextMenu.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	onMount(() => {
		$draw_order = data.draw_order;
		$assets_details = data.assets_details;
		$collection_name = data.collection_name;
	});
</script>

<div
	class=" 
	m-auto flex aspect-video
	h-[60%] w-[90%] max-w-[1920px]
	flex-row border
	dark:border-[--border_color]
	"
>
	<Sidebar />
	<Workspace collection_name={data.collection_name} />
	<ImageContextMenu />
</div>
