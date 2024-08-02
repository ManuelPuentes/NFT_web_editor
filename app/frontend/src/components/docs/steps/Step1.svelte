<script>
	import { TimelineItem, List, Li, AccordionItem, Accordion } from 'flowbite-svelte';

	// icons
	import FolderCloseIcon from '$icons/folder.close.icon.svelte';
	import FileIcon from '$icons/file.icon.svelte';

	const items = Array(5);
</script>

<TimelineItem title="assets folder:" date="Step 1">
	<div class="text-base font-normal">
		<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
			organize your assets into an assets folder, following this rules:
		</p>

		<List tag="ol" class="space-y-1 text-gray-500 dark:text-gray-400">
			<Li>Create a root folder and to contain all your project assets</Li>
			<Li>Create subfolders to organize this assets into groups called layers</Li>
			<Li>Compress the folder into a .zip file</Li>
		</List>

		<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
			If you have follow these rules your folder should look like this:
		</p>

		<Accordion multiple>
			<AccordionItem bind:open={items[0]}>
				<span slot="header" class="flex gap-1"><FolderCloseIcon class="mr-2 inline" />Assets</span>

				<Accordion multiple flush>
					<AccordionItem bind:open={items[1]}>
						<span slot="header" class="flex gap-1"
							><FolderCloseIcon class="mr-2 inline" />layer 1</span
						>
						<List tag="ul" class="space-y-3 text-gray-500 dark:text-gray-400">
							<Li icon><FileIcon /> asset 1.svg</Li>
							<Li icon><FileIcon /> asset 2.svg</Li>
							<Li icon><FileIcon /> asset 3.svg</Li>
						</List>
					</AccordionItem>
					<AccordionItem bind:open={items[2]}>
						<span slot="header" class="flex gap-1"
							><FolderCloseIcon class="mr-2 inline" />layer 2</span
						>

						<List tag="ul" class="space-y-3 text-gray-500 dark:text-gray-400">
							<Li icon><FileIcon /> asset 1.svg</Li>
							<Li icon><FileIcon /> asset 2.svg</Li>
							<Li icon><FileIcon /> asset 3.svg</Li>
						</List>
					</AccordionItem>
					<AccordionItem bind:open={items[3]}>
						<span slot="header" class="flex gap-1"
							><FolderCloseIcon class="mr-2 inline" />layer 3</span
						>

						<List tag="ul" class="space-y-3 text-gray-500 dark:text-gray-400">
							<Li icon><FileIcon /> asset 1.svg</Li>
							<Li icon><FileIcon /> asset 2.svg</Li>
							<Li icon><FileIcon /> asset 3.svg</Li>
						</List>
					</AccordionItem>
					<AccordionItem bind:open={items[4]}>
						<span slot="header" class="flex gap-1"><FolderCloseIcon class="mr-2 inline" />...</span>

						<List tag="ul" class="space-y-3 text-gray-500 dark:text-gray-400">
							<Li icon><FileIcon /> .svg</Li>
							<Li icon><FileIcon /> .svg</Li>
							<Li icon><FileIcon /> .svg</Li>
						</List>
					</AccordionItem>
				</Accordion>
			</AccordionItem>
		</Accordion>
	</div>
</TimelineItem>
