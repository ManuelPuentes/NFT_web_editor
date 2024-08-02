import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// api
import { getDrawOrder } from '$lib/api/draw-order';
import { getCollectionAssetsList } from '$lib/api/assets-list';
import { getCollectionAssetsDetails } from '$lib/api/assets-details';

export const load = (async ({ parent }) => {
	const { collection_name } = await parent();

	try {
		const [assets_list, assets_details, draw_order] = await Promise.all([
			getCollectionAssetsList({ collection_name }),
			getCollectionAssetsDetails({ collection_name }),
			getDrawOrder({ collection_name })
		]);

		return {
			draw_order,
			assets_list,
			assets_details
		};
	} catch (_error: any) {
		throw error(400, _error.message);
	}
}) satisfies PageServerLoad;
