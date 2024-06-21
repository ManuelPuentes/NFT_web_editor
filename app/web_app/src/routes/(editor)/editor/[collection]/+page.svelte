<script lang="ts">
	import { onMount } from 'svelte';

	import { draw_order, assets_details } from '../../../../stores/web_app_state';

	import Workspace from '../../../../components/editor/Workspace.svelte';
	import Sidebar from '../../../../components/editor/Sidebar.svelte';
	export let data: any;

	onMount(() => {
		$draw_order = data.initialDrawOrder;
		$assets_details = data.assets_details;
	});
</script>

<div
	class="
	w-screen
	h-screen
	flex
	justify-center
	items-center
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
		<Sidebar />
		<Workspace />
	</div>
</div>
