import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function ensureCollectionExist({ collection_name }: Collection) {
	const requestOptions = {
		method: 'GET'
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/exist/${collection_name}`;

	try {
		const exist = (await fetch(url, requestOptions)).ok;

		if (!exist) {
			throw new Error('collection not found ');
		}
	} catch (e: any) {
		throw new Error(e.message);
	}
}

interface Collection {
	collection_name: string;
}
