import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function getCanvasSize({ collection_name }: Collection) {
	const requestOptions = {
		method: 'GET'
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/canvas/${collection_name}`;

	try {
		const response = await (await fetch(url, requestOptions)).json();

		return response.data;
	} catch (error: any) {
		throw new Error(error.message);
	}
}
export async function setCanvasSize({ collection_name, size }: SetCanvasSize) {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');

	const raw = JSON.stringify({ size });

	const requestOptions = {
		method: 'PUT',
		headers: myHeaders,
		body: raw
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/canvas/${collection_name}`;

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
interface SetCanvasSize {
	collection_name: string;
	size: {
		width: number;
		height: number;
	};
}
