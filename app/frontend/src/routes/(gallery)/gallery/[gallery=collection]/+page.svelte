<script lang="ts">
	import GenerateImagesForm from '$components/gallery/GenerateImagesForm.svelte';
	import CollectionGallery from '$components/gallery/CollectionGallery.svelte';
	import type { PageData } from './$types';
	import { collection_name } from '$stores/web_app_state';

	import { onMount } from 'svelte';

	export let data: PageData;

	onMount(() => {
		$collection_name = data.collection_name;
	});
</script>

<div class="h-[100%] w-[100%]">
	<!-- <GenerateImagesForm /> -->
	<CollectionGallery />
</div>
