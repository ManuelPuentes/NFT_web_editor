<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
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
	import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';

	let page_number: number = 0;
	const page_size: number = 5;
	let total: number = 0;
	let collections: Promise<{
		totalItems: number;
		items: Array<{ name: string }>;
		nextItem: number;
	}>;

	export async function getCollectionsPaginated({
		limit = 5,
		skip = 0
	}: {
		limit?: number;
		skip?: number;
	}) {
		const requestOptions = {
			method: 'GET'
		};

		const queryParams = new URLSearchParams();
		queryParams.append('skip', `${skip}`);
		queryParams.append('limit', `${limit}`);

		const url = `${PUBLIC_BACKEND_URL}/collection?`;

		try {
			const response = await (await fetch(url + queryParams, requestOptions)).json();
			const { data } = response;
			total = data.totalItems;
			return data;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	const previous = async () => {
		if (page_number > 0) {
			page_number--;
			collections = getCollectionsPaginated({
				skip: page_number * page_size,
				limit: page_size
			});
		}
	};
	const next = async () => {
		if ((page_number + 1) * page_size < total) {
			page_number++;

			collections = getCollectionsPaginated({
				skip: page_number * page_size,
				limit: page_size
			});
		}
	};
	collections = getCollectionsPaginated({
		skip: page_number * page_size,
		limit: page_size
	});
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
		w-[100%] text-left text-lg
		font-semibold
		text-gray-900 dark:text-white
		"
	>
		Collections
	</caption>
	<Table hoverable={true} divClass="w-[100%]">
		<TableHead>
			<TableHeadCell>Collection name</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
		</TableHead>

		<TableBody tableBodyClass="divide-y">
			{#await collections}
				<span class=" ">
					<Spinner size="3" class="mr-1" />
				</span>
			{:then { items }}
				{#each items as collection, i}
					<TableBodyRow>
						<TableBodyCell>{collection.name}</TableBodyCell>
						<TableBodyCell>
							<a
								href={`/editor/${collection.name}`}
								class="font-medium text-primary-600 hover:underline dark:text-white">Load</a
							>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/await}
		</TableBody>
	</Table>
	<div class="flex w-[100%] justify-center space-x-3 rtl:space-x-reverse">
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
