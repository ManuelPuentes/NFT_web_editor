<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';

	import { Input, Button, Spinner, Alert, Label, Range } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	let minmaxValue = 5;
</script>

<form
	method="POST"
	class="
	m-5 flex
	w-[60%]
	max-w-[600px] flex-col items-center gap-5
	justify-self-center border
	bg-white p-4
	text-gray-900 dark:bg-gray-800
	 dark:text-white

"
>
	<caption
		class="w-[100%] text-pretty p-5 text-center text-lg
		font-semibold
		text-gray-900
		dark:text-white
		"
	>
		Generate Images
		<p class="mt-1 text-pretty text-sm font-normal text-gray-500 dark:text-gray-400">
			How many images you want to generate
		</p>
	</caption>

	<Range id="range" size="sm" class="w-[80%]" min="0" max="10" bind:value={minmaxValue} />

	<p class="mt-1 text-pretty text-sm font-normal text-gray-500 dark:text-gray-400">
		{minmaxValue}
	</p>

	<Button type="submit" color="light" class=" dark:color-primary mt-auto max-w-[30%]">send</Button>
</form>
