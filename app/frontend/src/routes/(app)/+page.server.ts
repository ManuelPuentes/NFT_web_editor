import type { Actions, PageServerLoad } from './$types';
import { redirect, type RequestEvent } from '@sveltejs/kit';

import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from 'sveltekit-superforms';
import { superValidate, setError } from 'sveltekit-superforms/server';

import { createCollectionRequest } from '$lib/api/create-collection';
import { getCollectionImagesPaginated } from '$lib/api/get-collections';

import { PUBLIC_GET_COLLECTIONS_PAGE_SIZE } from '$env/static/public';

const creatCollectionSchema = z.object({
	collectionName: z.string().min(5),
	collectionAssets: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.type === 'application/zip')
});

export const load = (async () => {
	const createCollectionForm = await superValidate(zod(creatCollectionSchema));
	const collections = getCollectionImagesPaginated({
		limit: Number(PUBLIC_GET_COLLECTIONS_PAGE_SIZE)
	});

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
