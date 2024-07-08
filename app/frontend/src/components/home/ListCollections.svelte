<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
</script>

<div
	class="	m-4 flex
	w-[60%] max-w-[600px] flex-col
	items-center gap-2 bg-white p-4
	text-gray-900 dark:bg-gray-800
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
			<TableBodyRow>
				<TableBodyCell>Apple MacBook Pro 17"</TableBodyCell>
				<TableBodyCell>
					<a
						href="/tables"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Load</a
					>
				</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Microsoft Surface Pro</TableBodyCell>
				<TableBodyCell>
					<a
						href="/tables"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Load</a
					>
				</TableBodyCell>
			</TableBodyRow>
			<TableBodyRow>
				<TableBodyCell>Magic Mouse 2</TableBodyCell>
				<TableBodyCell>
					<a
						href="/tables"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500">Load</a
					>
				</TableBodyCell>
			</TableBodyRow>
		</TableBody>
	</Table>
</div>
