import { error } from '@sveltejs/kit';

// api
import { backendHealth } from '$lib/api/health';
import { ensureCollectionExist } from '$lib/api/collection-exist';

export async function load({ params }: any) {
	const collection_name = params.collection;

	const promises: Array<Promise<unknown>> = [];

	promises.push(backendHealth());

	if (collection_name) {
		promises.push(ensureCollectionExist({ collection_name }));
	}

	try {
		await Promise.all(promises);
		return { collection_name };
	} catch (_error: any) {
		throw error(400, _error.message);
	}
}
