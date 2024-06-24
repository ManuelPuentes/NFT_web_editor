<script>
	// @ts-nocheck
	import Folder from './Folder.svelte';
	import File from './File.svelte';
	import { draw_order, assets_details } from '../../stores/web_app_state';
	import SortableList from 'svelte-sortable-list';

	let folders = [];

	const sortList = (e) => {
		folders = e.detail;
		$draw_order = e.detail;
	};

	$: folders = $draw_order;
</script>

<div
	class="
	w-[20%]
	h-[90%]
	overflow-y-auto
	overflow-x-hidden
	border dark:border-[--border_color]
"
>
	<SortableList list={folders} key="" on:sort={sortList} let:item let:index>
		<Folder folder_name={item}>
			{#each Object.keys($assets_details[item]) as file}
				<File folder_name={item} file_name={file} file_data={$assets_details[item][file]} />
			{/each}
		</Folder>
	</SortableList>
</div>
