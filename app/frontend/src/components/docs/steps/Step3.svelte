<script>
	import { TimelineItem, A, Accordion, AccordionItem, List, Li, Kbd, Alert } from 'flowbite-svelte';
	// import { CheckCircleSolid } from 'flowbite-svelte-icons';

	import CheckSolidIcon from '$icons/check.icon.svelte';

	const items = Array(5);
</script>

<TimelineItem title="use the editor:" date="Step 3">
	<div class="text-base font-normal">
		<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
			after you've created your collection, and get redirected to the editor you will see 2 main
			sections:
		</p>

		<Accordion multiple>
			<AccordionItem>
				<span slot="header">sidebar</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					the left side bar will show you all your assets following the assets folder structure, you
					can interact with this bar:
				</p>

				<List tag="ul" class="space-y-1 text-gray-500 dark:text-gray-400" list="none">
					<Li icon>
						<CheckSolidIcon class="me-2 h-5 w-5 text-green-500 dark:text-green-400" />
						draggin the elements to change the draw order of the layers.
					</Li>
					<Li icon>
						<CheckSolidIcon class="me-2 h-5 w-5 text-green-500 dark:text-green-400" />
						clicking the items to display the subfolder files.
					</Li>
					<Li icon>
						<CheckSolidIcon class="me-2 h-5 w-5 text-green-500 dark:text-green-400" />
						clicking the subfolder elements to display them in the editor workspace
					</Li>
				</List>
				<p class="text-gray-500 dark:text-gray-400">
					the workspace will only display one element per layer (subfolder) at the same time.
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">workspace</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					the main section of the editor, the workspace will display the assets and allows you to
					modify their sizes and positions, SVGeditor advise you to avoid large size svg files,
					resize svgs can be a resource-intensive tasks
				</p>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					the editor provides you with 2 useful tools, you can find them in the context menu (rigth
					click)
				</p>

				<p class="mb-2 text-gray-500 dark:text-gray-400">
					top left corner will display an indicator when you've unsaved changes and provides you the <Kbd
						class="px-2 py-1.5">Ctrl</Kbd
					> + <Kbd class="px-2 py-1.5">S</Kbd> key binding to save.
				</p>

				<p class="mb-2 text-gray-500 dark:text-gray-400">
					the workspace also display the canvas, canvas can be also resized to change the images
					size
				</p>

				<Alert color="blue" border>
					Changes in the canvas will generate changes on the assets positions, you will need to
					check them after you resize the canvas
				</Alert>
			</AccordionItem>
		</Accordion>
	</div>
</TimelineItem>
