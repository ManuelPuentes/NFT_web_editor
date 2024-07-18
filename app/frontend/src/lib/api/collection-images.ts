import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function getCollectionImagesPaginated({
	collection_name,
	limit = 5,
	skip = 0,
	orderBy = 'id',
	orderType = 'ASC'
}: createCollection) {
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

interface createCollection {
	collection_name: string;
	limit?: number;
	skip?: number;
	orderBy?: string;
	orderType?: string;
}
