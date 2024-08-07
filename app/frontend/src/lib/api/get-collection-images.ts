import { PUBLIC_BACKEND_URL, PUBLIC_GET_COLLECTION_IMAGES_PAGE_SIZE } from '$env/static/public';
import type { PaginatedResponse } from '$lib/interfaces/paginated-response.interface';

export async function getCollectionImagesPaginated({
	collection_name,
	limit = Number(PUBLIC_GET_COLLECTION_IMAGES_PAGE_SIZE),
	skip = 0,
	orderBy = 'id',
	orderType = 'ASC'
}: getImagesCollection): Promise<PaginatedResponse<Image>> {
	const requestOptions = {
		method: 'GET'
	};

	const queryParams = new URLSearchParams();
	queryParams.append('skip', `${skip}`);
	queryParams.append('limit', `${limit}`);

	const url = `${PUBLIC_BACKEND_URL}/collection/images/${collection_name}?`;

	try {
		const response = await (await fetch(url + queryParams, requestOptions)).json();
		return response.data;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

interface getImagesCollection {
	collection_name: string;
	limit?: number;
	skip?: number;
	orderBy?: string;
	orderType?: string;
}

interface Image {
	url: string;
	metadata: any;
	hash: string;
}
