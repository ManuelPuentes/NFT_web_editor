<script lang="ts">
	import CollectionProfile from '$components/gallery/collectionProfile.svelte';
	import GenerateImagesForm from '$components/generate/GenerateImagesForm.svelte';
	import { Alert, Blockquote } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	enum GenerationStatus {
		ACTIVE = 'active',
		INACTIVE = 'inactive'
	}

	import { superForm } from 'sveltekit-superforms/client';

	import type { PageData } from './$types';

	export let data: PageData;

	const { form } = superForm(data.generateImagesForm);
</script>

<div class="flex h-fit w-[100%] flex-col items-center">
	<CollectionProfile />

	<caption
		class="w-[90%%] text-pretty p-5 text-lg
font-semibold
text-gray-900
dark:text-white

"
	>
		Generate Images

		<Blockquote
			baseClass="mt-1 text-balance text-sm font-normal text-gray-500 dark:text-gray-400 w-[60%] m-auto"
		>
			Generate images is a resource-intensive tasks, the time needed to generate images will depend
			directly of the amount of images requested to generate, if you schwdule an images generation
			process for a project you cant schedule another one until this process ends, all the generated
			images can be founded on gallery section "</Blockquote
		>
	</caption>

	{#if data.collection_status == GenerationStatus.ACTIVE}
		<Alert color="blue" dismissable border>
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			we are currenly generating images for this collection. pls wait until this process ends, and try
			again.
		</Alert>
	{:else}
		<GenerateImagesForm data={form} />
	{/if}
</div>
