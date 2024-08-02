import type { Actions, PageServerLoad } from './$types';
import { redirect, type RequestEvent } from '@sveltejs/kit';

import { zod } from 'sveltekit-superforms/adapters';
import { fail } from 'sveltekit-superforms';
import { superValidate, setError } from 'sveltekit-superforms/server';

// schemas
import { creatCollectionSchema } from '$lib/schemas/create_collection.schema';

// api
import { createCollectionRequest } from '$lib/api/create-collection';
import { getCollectionImagesPaginated } from '$lib/api/get-collections';

export const load = (async () => {
	const createCollectionForm = await superValidate(zod(creatCollectionSchema));
	const collections = getCollectionImagesPaginated({});
	return { createCollectionForm, collections };
}) satisfies PageServerLoad;

export const actions: Actions = {
	createCollection: async (event: RequestEvent) => {
		const form = await superValidate(event, zod(creatCollectionSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { collectionAssets: collection_assets, collectionName: collection_name } = form.data;

		try {
			await createCollectionRequest({
				collection_name,
				collection_assets
			});
		} catch (error: any) {
			return setError(form, error.message);
		}

		throw redirect(300, `/editor/${collection_name}`);
	}
} satisfies Actions;
