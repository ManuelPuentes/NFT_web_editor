<script>
	import { TimelineItem, Alert } from 'flowbite-svelte';
</script>

<TimelineItem title="generate images:" date="Step 4">
	<div class="text-base font-normal">
		<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
			when you finished to edit your svgs and are happy with their sizes and positions your are ready to generate permutations, this step its really simple, in the top bar you will find  the generate tab, and this tap allows to generate small batches of images ramdonly generated each of them is an unique permutation.
		</p>


		<Alert color="blue" border>
			Generate tab wiil only allows you to generate a new batch if theres not a current generate proccess active, and displays you an alert if there so.
		</Alert>
	</div>
</TimelineItem>
