import { ensureCollectionExist } from '$lib/api/collection-exist';
import { getCollectionImagesPaginated } from '$lib/api/collection-images';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */

export async function load({ params }: any) {
	const collection_name = params.collection;

	try {
		await ensureCollectionExist({ collection_name });
		return { collection_name };
	} catch (error: any) {
		throw error(400, error.message);
	}
}
