<script lang="ts">
	import { onMount } from 'svelte';
	import { draw_order, assets_details } from '../../../../stores/web_app_state';

	import Workspace from '../../../../components/editor/Workspace.svelte';
	import Sidebar from '../../../../components/editor/Sidebar.svelte';
	import ChangesIndicator from '../../../../components/editor/ChangesIndicator.svelte';
	export let data: any;

	onMount(() => {
		$draw_order = data.initialDrawOrder;
		$assets_details = data.assets_details;
	});
</script>

<div
	class="
	w-[100%]
	h-[100%]
	flex
	justify-center
	items-center
	mt-5
"
>
	<div
		class=" 
		w-[1920px]
		h-[1080px]
		m-auto
		flex flex-row
	"
	>
		<ChangesIndicator collectionName={data.collectionName} />
		<Sidebar />
		<Workspace />
	</div>
</div>
