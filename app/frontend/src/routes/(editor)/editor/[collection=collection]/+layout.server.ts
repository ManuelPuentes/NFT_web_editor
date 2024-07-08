import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */

import { ensureCollectionExist } from '$lib/api/collection-exist';
import { getCollectionAssetsDetails } from '$lib/api/assets-details';
import { getDrawOrder } from '$lib/api/draw-order';

export async function load({ params }: any) {
	const collection_name = params.collection;
	try {
		const [exist, assets_details, draw_order] = await Promise.all([
			ensureCollectionExist({ collection_name }),
			getCollectionAssetsDetails({ collection_name }),
			getDrawOrder({ collection_name })
		]);

		return {
			collection_name,
			assets_details,
			draw_order
		};
	} catch (_error: any) {
		throw error(400, _error.message);
	}
}
