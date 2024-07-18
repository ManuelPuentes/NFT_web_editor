<script lang="ts">
	import { Gallery } from 'flowbite-svelte';
	import GalleryELement from './GalleryELement.svelte';
	import { onMount } from 'svelte';
	import { getCollectionImagesPaginated } from '$lib/api/collection-images';
	import { PaginationItem } from 'flowbite-svelte';
	import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';

	import CollectionProfile from './collectionProfile.svelte';

	import { page } from '$app/stores';

	let images: Array<{ url: string; metadata: any; hash: string }> = [];
	const page_size = 20;
	let skip = 0;
	let lastItem = 0;
	let helper: { start: number; end: number; total: number } = { start: 0, end: 0, total: 0 };

	let collection_name: string = $page.params.gallery;
	onMount(async () => {
		helper = { start: skip, end: skip + images.length, total: 100 };

		let { items, totalItems, nextItem } = await getCollectionImagesPaginated({
			collection_name,
			skip,
			limit: page_size
		});

		helper = { start: skip, end: skip + items.length, total: totalItems };
		lastItem = nextItem;
		images = items;
	});

	const previous = async () => {
		if (skip > 0) {
			let { items, nextItem, totalItems } = await getCollectionImagesPaginated({
				collection_name,
				skip: skip - images.length,
				limit: page_size
			});

			skip = skip - images.length;
			images = items;
			lastItem = nextItem;
			helper = { start: skip, end: skip + items.length, total: totalItems };
		}
	};
	const next = async () => {
		if (lastItem < helper.total) {
			let { items, nextItem, totalItems } = await getCollectionImagesPaginated({
				collection_name,
				skip: lastItem,
				limit: page_size
			});
			images = items;
			skip = lastItem;
			lastItem = nextItem;
			helper = { start: skip, end: skip + items.length, total: totalItems };
		}
	};
</script>

<div
	class="gallery space-between flex h-[100%] w-[100%] select-none flex-col items-center self-center"
>
	<CollectionProfile />

	<div class=" grid w-[70%] grid-cols-1 gap-5">
		<Gallery class="m-4  h-fit grid-cols-5 overflow-x-hidden overflow-y-hidden">
			{#each images as img, i}
				<GalleryELement item={img} />
			{/each}
		</Gallery>

		<div class=" mt-5 flex flex-col items-center justify-center gap-2 p-5">
			<div class="text-sm text-gray-700 dark:text-gray-400">
				Showing <span class="font-semibold text-gray-900 dark:text-white">{helper.start}</span>
				to
				<span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span>
				of
				<span class="font-semibold text-gray-900 dark:text-white">{helper.total}</span>
				Entries
			</div>

			<div class="flex space-x-3 rtl:space-x-reverse">
				<PaginationItem class="flex items-center" on:click={previous}>
					<ArrowLeftOutline class="me-2 h-3.5 w-3.5" />
					Previous
				</PaginationItem>
				<PaginationItem class="flex items-center" on:click={next}>
					Next
					<ArrowRightOutline class="ms-2 h-3.5 w-3.5" />
				</PaginationItem>
			</div>
		</div>
	</div>
</div>
