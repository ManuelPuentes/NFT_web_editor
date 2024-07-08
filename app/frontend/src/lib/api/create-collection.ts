import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function createCollectionRequest({
	collection_name,
	collection_assets
}: createCollection) {
	const formdata = new FormData();

	formdata.append('assets', collection_assets);

	const requestOptions = {
		method: 'POST',
		body: formdata
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/create/${collection_name}`;

	try {
		let response: any = await fetch(url, requestOptions);

		if (!response.ok) {
			response = await response.json();
			throw new Error(response.message);
		}
	} catch (e: any) {
		throw new Error(e.message);
	}
}

interface createCollection {
	collection_name: string;
	collection_assets: File;
}
