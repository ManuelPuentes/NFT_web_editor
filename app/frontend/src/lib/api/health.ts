import { PUBLIC_BACKEND_URL } from '$env/static/public';

export async function backendHealth() {
	const requestOptions = {
		method: 'GET'
	};

	const url = `${PUBLIC_BACKEND_URL}/health`;

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
