<script lang="ts">
	import ListCollections from '$components/home/ListCollections.svelte';
	import CreateCollectionForm from '$components/home/CreateCollectionForm.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import type { PageData } from './$types';

	export let data: PageData;

	const { form } = superForm(data.createCollectionForm);
	const collections = data.collections;
</script>

<div
	class="flex h-[100dvh] flex-col items-center
bg-slate-100 bg-[repeating-linear-gradient(0deg,black_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,black_0_1px,transparent_1px_20px)]
dark:bg-slate-700 dark:bg-[repeating-linear-gradient(0deg,black_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,black_0_1px,transparent_1px_20px)]
"
>
	<CreateCollectionForm data={form} />
	<ListCollections {collections} />
</div>
