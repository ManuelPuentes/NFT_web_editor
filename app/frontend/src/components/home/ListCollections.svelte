<script lang="ts">
	import { onMount } from 'svelte';
	import {
		PaginationItem,
		Spinner,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	import ArrowLeftIcon from '$icons/arrow-left.icon.svelte';
	import ArrowRightIcon from '$icons/arrow-right.icon.svelte';

	import { PUBLIC_GET_COLLECTIONS_PAGE_SIZE } from '$env/static/public';
	import { getCollectionImagesPaginated } from '$lib/api/get-collections';
	import type { PaginatedResponse } from '$lib/interfaces/paginated-response.interface';

	let page_number: number = 0;
	const page_size: number = Number(PUBLIC_GET_COLLECTIONS_PAGE_SIZE);
	let total: number = 0;

	export let collections: Promise<PaginatedResponse<{ name: string }>>;

	onMount(() => {
		collections.then((data) => {
			total = data.totalItems;
		});
	});

	const previous = async () => {
		if (page_number > 0) {
			page_number--;
			collections = getCollectionImagesPaginated({
				skip: page_number * page_size,
				limit: page_size
			});
		}
	};
	const next = async () => {
		if ((page_number + 1) * page_size < total) {
			page_number++;

			collections = getCollectionImagesPaginated({
				skip: page_number * page_size,
				limit: page_size
			});
		}
	};
</script>

<div
	class="	m-4 flex
	w-[60%] max-w-[600px] flex-col
	items-center gap-2 overflow-y-auto bg-white
	p-4 text-gray-900
	dark:bg-gray-800
	dark:text-white

	"
>
	<caption
		class="
		w-[100%] text-center text-lg
		font-semibold
		text-gray-900 dark:text-white

		"
	>
		Collections
	</caption>
	{#await collections}
		<span class="flex w-[100%] justify-center">
			<Spinner size="4" class="" />
		</span>
	{:then { items }}
		<Table hoverable={true} divClass="w-[100%] ">
			<TableHead>
				<TableHeadCell>Collection name</TableHeadCell>
				<TableHeadCell>
					<span class="sr-only">Edit</span>
				</TableHeadCell>
			</TableHead>
			<TableBody tableBodyClass="divide-y">
				{#each items as { name }, i}
					<TableBodyRow>
						<TableBodyCell>{name}</TableBodyCell>
						<TableBodyCell>
							<a
								href={`/editor/${name}`}
								class="font-medium text-primary-600 hover:underline dark:text-white">Load</a
							>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
		<div class="flex w-[100%] justify-center space-x-3 rtl:space-x-reverse">
			<PaginationItem class="flex items-center" on:click={previous}>
				<ArrowLeftIcon class="inline" />
				Previous
			</PaginationItem>
			<PaginationItem class="flex items-center" on:click={next}>
				Next
				<ArrowRightIcon class="inline" />
			</PaginationItem>
		</div>
	{/await}
</div>
