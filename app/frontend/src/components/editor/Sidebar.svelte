<script>
	// @ts-nocheck
	import Folder from './Folder.svelte';
	import File from './File.svelte';
	import { draw_order, assets_details, collection_name } from '$stores/web_app_state';
	import SortableList from 'svelte-sortable-list';
	import { setDrawOrder } from '$lib/api/draw-order';

	const sortList = async (e) => {
		$draw_order = e.detail;
		await setDrawOrder({ collection_name: $collection_name, draw_order: $draw_order });
	};
</script>

<div
	class="
	h-[100%] w-[20%]
	overflow-y-auto
	overflow-x-hidden
	border-r dark:border-[--border_color]
"
>
	<SortableList list={$draw_order} key="" on:sort={sortList} let:item let:index>
		<Folder folder_name={item}>
			{#each Object.keys($assets_details[item]) as file}
				<File folder_name={item} file_name={file} file_data={$assets_details[item][file]} />
			{/each}
		</Folder>
	</SortableList>
</div>
