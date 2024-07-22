import { error } from '@sveltejs/kit';
import { getDrawOrder } from '$lib/api/draw-order';
import { getCollectionAssetsDetails } from '$lib/api/assets-details';

export const load = async ({ parent }: any) => {
	const { collection_name } = await parent();

	try {
		const [assets_details, draw_order] = await Promise.all([
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
};
