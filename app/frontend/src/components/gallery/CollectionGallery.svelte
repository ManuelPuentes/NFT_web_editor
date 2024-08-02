<script lang="ts">
	import { onMount } from 'svelte';

	import { PaginationItem } from 'flowbite-svelte';
	import { Gallery, Spinner } from 'flowbite-svelte';

	import GalleryELement from './GalleryELement.svelte';
	import { getCollectionImagesPaginated } from '$lib/api/get-collection-images';
	import { PUBLIC_GET_COLLECTION_IMAGES_PAGE_SIZE } from '$env/static/public';
	import type { PaginatedResponse } from '$lib/interfaces/paginated-response.interface';

	export let images: Promise<PaginatedResponse<{ url: string; metadata: any; hash: string }>>;
	export let collection_name: string;

	let page_number: number = 0;
	const page_size = Number(PUBLIC_GET_COLLECTION_IMAGES_PAGE_SIZE);

	let total: number = 0;

	onMount(() => {
		images.then((data) => {
			total = data.totalItems;
		});
	});

	const previous = async () => {
		if (page_number > 0) {
			page_number--;
			images = getCollectionImagesPaginated({
				collection_name,
				skip: page_number * page_size,
				limit: page_size
			});
		}
	};
	const next = async () => {
		if ((page_number + 1) * page_size < total) {
			page_number++;
			images = getCollectionImagesPaginated({
				collection_name,
				skip: page_number * page_size,
				limit: page_size
			});
		}
	};
</script>

<div class=" space-between flex h-[100%] w-[100%] select-none flex-col items-center self-center">
	<div class=" grid aspect-square w-[50%] grid-cols-1 gap-5 border">
		{#await images}
			<span class="flex items-center justify-center">
				<Spinner size="10" />
			</span>
		{:then { totalItems, items }}
			<Gallery
				class="m-4  h-fit overflow-x-hidden  overflow-y-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
			>
				{#each items as img, i}
					<GalleryELement item={img} />
				{/each}
			</Gallery>

			<div class=" mt-5 flex flex-col items-center justify-center gap-2 self-end p-5">
				<div class="text-sm text-gray-700 dark:text-gray-400">
					Showing <span class="font-semibold text-gray-900 dark:text-white"
						>{page_number * page_size}</span
					>
					to
					<span class="font-semibold text-gray-900 dark:text-white"
						>{page_number * page_size + items.length}</span
					>
					of
					<span class="font-semibold text-gray-900 dark:text-white">{totalItems}</span>
					Entries
				</div>

				<div class="flex space-x-3 rtl:space-x-reverse">
					<PaginationItem class="flex items-center" on:click={previous}>
						<!-- <ArrowLeftOutline class="me-2 h-3.5 w-3.5" /> -->
						Previous
					</PaginationItem>
					<PaginationItem class="flex items-center" on:click={next}>
						Next
						<!-- <ArrowRightOutline class="ms-2 h-3.5 w-3.5" /> -->
					</PaginationItem>
				</div>
			</div>
		{/await}
	</div>
</div>
