<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	// components
	import { Button } from 'flowbite-svelte';
	import Sidebar from '$components/editor/Sidebar.svelte';
	import Workspace from '$components/editor/Workspace.svelte';
	import ChangesIndicator from '$components/editor/ChangesIndicator.svelte';
	import ImageContextMenu from '$components/editor/ImageContextMenu.svelte';

	// icons
	import CenterSquareIcon from '$icons/center.square.icon.svelte';

	// stores
	import { assets_details, viewer_ref, draw_order } from '$stores/web_app_state';

	export let data: PageData;

	onMount(async () => {
		$assets_details = data.assets_details;
		$draw_order = data.draw_order;
	});
</script>

<Button
	color="light"
	class="dark:color-primary float-right m-2  p-1 "
	on:click={() => {
		$viewer_ref.scrollCenter();
	}}><CenterSquareIcon /></Button
>

<Sidebar assets_list={data.assets_list} traits_order={data.draw_order} />

<ChangesIndicator
	data={data.assets_details}
	draw_order_data={data.draw_order}
	collection_name={data.collection_name}
	class="float-right m-2 flex items-center p-1 text-sm"
/>

<Workspace />

<ImageContextMenu />
