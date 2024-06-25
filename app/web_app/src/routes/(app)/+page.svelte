<script lang="ts">
	import ListCollections from '$components/home/ListCollections.svelte';
	import CreateCollectionForm from '$components/home/CreateCollectionForm.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div
	class="flex flex-col items-center h-[100dvh]
dark:bg-[repeating-linear-gradient(0deg,black_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,black_0_1px,transparent_1px_20px)] dark:bg-slate-700
bg-[repeating-linear-gradient(0deg,black_0_1px,transparent_1px_20px),repeating-linear-gradient(90deg,black_0_1px,transparent_1px_20px)] bg-slate-100
"
>
	<CreateCollectionForm data={data.createCollectionForm} />
	<ListCollections />
</div>
