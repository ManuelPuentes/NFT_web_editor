<script lang="ts">
	import { onMount } from 'svelte';
	import { draw_order, assets_details, collection_name } from '$stores/web_app_state';

	import Workspace from '$components/editor/Workspace.svelte';
	import Sidebar from '$components/editor/Sidebar.svelte';
	import ChangesIndicator from '$components/editor/ChangesIndicator.svelte';
	export let data: any;

	onMount(() => {
		$draw_order = data.draw_order;
		$assets_details = data.assets_details;
		$collection_name = data.collection_name;
	});
</script>

<div
	class=" 
	w-[90%] h-[60%] aspect-video
	flex flex-row
	border dark:border-[--border_color]
	m-auto
	"
>
	<ChangesIndicator collectionName={data.collection_name} />
	<Sidebar />
	<Workspace collection_name={data.collection_name} />
</div>
