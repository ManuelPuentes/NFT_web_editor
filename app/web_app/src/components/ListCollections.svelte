<script>
	import {
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
</script>

<Table
	divClass="
	max-w-[700px] w-[80vw]
	flex flex-col items-center 
	py-5 px-10 
	my-5
	"
	hoverable={true}
>
	<caption
		class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800"
	>
		Create Collection
		<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
			Create a new collection project, set all rules to draw and start generating batches.
		</p>
	</caption>
	<TableHead theadClass="my-10">
		<TableHeadCell>Product name</TableHeadCell>
		<TableHeadCell>
			<span class="sr-only">Load</span>
		</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		<TableBodyRow>
			<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>

			<TableBodyCell>
				<Button href="/editor" color="alternative" class="dark:color-primary">load</Button>
			</TableBodyCell>
		</TableBodyRow>
	</TableBody>
</Table>
