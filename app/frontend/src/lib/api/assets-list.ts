import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function getCollectionAssetsList({ collection_name }: Collection) {
	const requestOptions = {
		method: 'GET'
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/assets_list/${collection_name}`;
	try {
		const result = await (await fetch(url, requestOptions)).json();
		return result.data;
	} catch (error: any) {
		throw new Error(error.message);
	}
}

interface Collection {
	collection_name: string;
}
