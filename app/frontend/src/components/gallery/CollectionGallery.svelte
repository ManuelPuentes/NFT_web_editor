<script lang="ts">
	import { Gallery, Spinner } from 'flowbite-svelte';
	import GalleryELement from './GalleryELement.svelte';
	import { PaginationItem } from 'flowbite-svelte';
	import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';

	import CollectionProfile from './collectionProfile.svelte';
	import { PUBLIC_BACKEND_URL } from '$env/static/public';

	import { page } from '$app/stores';

	async function getCollectionImagesPaginated({
		collection_name,
		limit = 5,
		skip = 0
	}: {
		collection_name: string;
		limit?: number;
		skip?: number;
	}): Promise<{
		totalItems: number;
		items: Array<{ url: string; metadata: any; hash: string }>;
		nextItem: number;
	}> {
		const requestOptions = {
			method: 'GET'
		};

		const queryParams = new URLSearchParams();
		queryParams.append('skip', `${skip}`);
		queryParams.append('limit', `${limit}`);

		const url = `${PUBLIC_BACKEND_URL}/collection/images/${collection_name}?`;

		try {
			const response = await (await fetch(url + queryParams, requestOptions)).json();

			const { data } = response;

			total = data.totalItems;
			return data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	let images: Promise<{
		totalItems: number;
		items: Array<{ url: string; metadata: any; hash: string }>;
		nextItem: number;
	}>;

	let collection_name: string = $page.params.gallery;
	let page_number: number = 0;
	const page_size = 20;

	images = getCollectionImagesPaginated({
		collection_name,
		skip: page_number * page_size,
		limit: page_size
	});

	let total: number = 0;

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

<div
	class="gallery space-between flex h-[100%] w-[100%] select-none flex-col items-center self-center"
>
	<CollectionProfile />

	<div class=" grid w-[70%] grid-cols-1 gap-5">
		{#await images}
			<span class=" ">
				<Spinner size="3" class="mr-1" />
			</span>
		{:then { totalItems, items }}
			<Gallery
				class="m-4  h-fit overflow-x-hidden  overflow-y-hidden sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
			>
				{#each items as img, i}
					<GalleryELement item={img} />
				{/each}
			</Gallery>

			<div class=" mt-5 flex flex-col items-center justify-center gap-2 p-5">
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
						<ArrowLeftOutline class="me-2 h-3.5 w-3.5" />
						Previous
					</PaginationItem>
					<PaginationItem class="flex items-center" on:click={next}>
						Next
						<ArrowRightOutline class="ms-2 h-3.5 w-3.5" />
					</PaginationItem>
				</div>
			</div>
		{/await}
	</div>
</div>
