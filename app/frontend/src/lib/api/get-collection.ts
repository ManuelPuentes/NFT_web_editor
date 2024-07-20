import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function getCollectionImagesPaginated({
	limit = 5,
	skip = 0,
	orderBy = 'id',
	orderType = 'ASC'
}: getCollections) {
	const requestOptions = {
		method: 'GET'
	};

	const queryParams = new URLSearchParams();
	queryParams.append('skip', `${skip}`);
	queryParams.append('limit', `${limit}`);

	const url = `${PUBLIC_BACKEND_URL}/collection?`;

	try {
		const response = await (await fetch(url + queryParams, requestOptions)).json();
		return response.data;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

interface getCollections {
	limit?: number;
	skip?: number;
	orderBy?: string;
	orderType?: string;
}
