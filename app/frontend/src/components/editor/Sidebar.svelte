<script lang="ts">
	import { onMount } from 'svelte';
	import { sineIn } from 'svelte/easing';
	import { Drawer, Button, CloseButton, Tooltip } from 'flowbite-svelte';
	import {
		SortableList,
		sortItems,
		type SortableListProps
	} from '@rodrigodagostino/svelte-sortable-list';

	// components
	import File from './File.svelte';
	import Folder from './Folder.svelte';

	//icons
	import SortIcon from '$icons/sort.icon.svelte';
	import BurgerIcon from '$icons/burger.icon.svelte';

	// stores
	import { draw_order } from '$stores/web_app_state';

	export let assets_list: Record<string, string[]>;
	export let traits_order: string[];

	let items: SortableListProps['items'] = [];

	let hidden = true;

	onMount(() => {
		traits_order.map((trait) => {
			items.push({
				id: items.length,
				trait,
				files: assets_list[trait]
			});
		});
	});

	function handleSort(event: CustomEvent) {
		const { prevIndex, nextIndex } = event.detail;
		items = sortItems(items, prevIndex, nextIndex);
		$draw_order = items.map((item) => item.trait as string);
	}
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
</script>

<Button
	color="light"
	class=" dark:color-primary m-2 mt-auto max-w-[30%] p-1 focus:border"
	on:click={() => {
		hidden = false;
	}}><BurgerIcon /></Button
>

<Drawer transitionType="fly" {transitionParams} bind:hidden id="sidebar">
	<CloseButton
		on:click={() => {
			hidden = true;
		}}
	/>
	<SortableList {items} let:item on:sort={handleSort}>
		<SortIcon
			id="handle-icon"
			slot="handle"
			class="absolute right-0 m-4  rounded-xl p-1 dark:hover:bg-[--primary_color]"
		/>

		<Tooltip triggeredBy="#handle-icon" placement="left">Drag!</Tooltip>

		<Folder folder_name={item.trait}>
			{#each item.files as file}
				<File file_name={file} folder_name={item.trait} />
			{/each}
		</Folder>
	</SortableList>
</Drawer>

<!-- <Button type="submit" color="light" class=" dark:color-primary mt-auto max-w-[30%]">send</Button> -->
