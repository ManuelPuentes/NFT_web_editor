import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function getCollectionStatus({ collection_name }: getCollectionStatus) {
	const requestOptions = {
		method: 'GET'
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/status/${collection_name}`;

	try {
		const response = await (await fetch(url, requestOptions)).json();
		return response.data;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

interface getCollectionStatus {
	collection_name: string;
}
