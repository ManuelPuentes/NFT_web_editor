import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { AssetDetails } from '../../interfaces/AssetDetails';

export async function setAssetsDetails({ assets_details, collection_name }: SetAssetsDetails) {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	const raw = JSON.stringify({ assets_details });
	const requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/asset-datails/${collection_name}`;

	try {
		let response: any = await fetch(url, requestOptions);

		if (!response.ok) {
			response = await response.json();
			throw new Error(response.message);
		}
	} catch (error: any) {
		throw new Error(error.message);
	}
}
export async function getCollectionAssetsDetails({ collection_name }: Collection) {
	const requestOptions = {
		method: 'GET'
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/asset-details/${collection_name}`;
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

interface SetAssetsDetails {
	collection_name: string;
	assets_details: Record<string, Record<string, AssetDetails>>;
}
