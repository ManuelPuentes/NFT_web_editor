<script lang="ts">
	import type { PageData } from './$types';
	import CollectionGallery from '$components/gallery/CollectionGallery.svelte';
	import CollectionProfile from '$components/gallery/CollectionProfile.svelte';

	export let data: PageData;

	const images = data.images;
	const collection_name = data.collection_name;
</script>

<div class="h-[100%] w-[100%]">
	<CollectionProfile />
	<CollectionGallery {collection_name} {images} />
</div>
