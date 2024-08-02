import type { Actions, RequestEvent } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

import { generateImages } from '$lib/api/generate-images';
import { getCollectionStatus } from '$lib/api/collection-status';

import { generateImagesSchema } from '$lib/schemas/generate_images.schema';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { collection_name } = await parent();
	const generateImagesForm = await superValidate(zod(generateImagesSchema));

	try {
		const status = await getCollectionStatus({ collection_name });
		return {
			collection_status: status,
			generateImagesForm
		};
	} catch (error: any) {
		throw error(400, error.message);
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	generateImages: async (event: RequestEvent) => {
		const collection_name = event.params.collection;

		if (collection_name) {
			const form = await superValidate(event, zod(generateImagesSchema));

			const { imagesAmount: images_amount } = form.data;

			try {
				await generateImages({
					collection_name,
					amount: images_amount
				});
			} catch (error: any) {
				return setError(form, error.message);
			}
		}
	}
} satisfies Actions;
