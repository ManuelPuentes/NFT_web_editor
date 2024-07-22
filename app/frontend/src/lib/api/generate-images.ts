import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function generateImages({ collection_name, amount }: generateImages) {
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	const raw = JSON.stringify({ amount });

	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw
	};

	const url = `${PUBLIC_BACKEND_URL}/collection/generate-images/${collection_name}`;

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

interface generateImages {
	collection_name: string;
	amount: number;
}
