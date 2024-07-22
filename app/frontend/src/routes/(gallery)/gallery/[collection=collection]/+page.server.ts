import type { PageServerLoad } from './$types';
import { getCollectionImagesPaginated } from '$lib/api/get-collection-images';
import { PUBLIC_GET_COLLECTION_IMAGES_PAGE_SIZE } from '$env/static/public';

export const load = (async ({ parent }) => {
	const { collection_name } = await parent();
	const images = getCollectionImagesPaginated({
		collection_name,
		limit: Number(PUBLIC_GET_COLLECTION_IMAGES_PAGE_SIZE)
	});

	return {
		images
	};
}) satisfies PageServerLoad;
