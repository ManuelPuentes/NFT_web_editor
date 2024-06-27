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
	class="	w-[60%] max-w-[600px]
	flex flex-col items-center
	text-gray-900 bg-white dark:text-white dark:bg-gray-800
	p-4 m-4
	gap-2
	"
>
	<caption
		class="
		text-lg font-semibold text-left
		w-[100%]
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
