import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function getDrawOrder({ collection_name }: Collection) {
	const requestOptions = {
		method: 'GET'
	};
	const url = `${PUBLIC_BACKEND_URL}/collection/draw_order/${collection_name}`;

	try {
		const result = await (await fetch(url, requestOptions)).json();
		return result.data;
	} catch (e: any) {
		throw new Error(e.message);
	}
}

export async function setDrawOrder({ collection_name, draw_order }: SetDrawOrder) {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const raw = JSON.stringify({ draw_order });

	const requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/draw_order/${collection_name}`;

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

interface Collection {
	collection_name: string;
}
interface SetDrawOrder {
	collection_name: string;
	draw_order: Array<string>;
}
