<script lang="ts">
	import ListCollections from '$components/home/ListCollections.svelte';
	import CreateCollectionForm from '$components/home/CreateCollectionForm.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	import type { PageData } from './$types';

	export let data: PageData;

	const { form } = superForm(data.createCollectionForm);
	const collections = data.collections;
</script>

<div class="flex h-[100dvh] flex-col items-center">
	<CreateCollectionForm data={form} />
	<ListCollections {collections} />
</div>
