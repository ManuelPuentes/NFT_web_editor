import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { Actions } from './$types';

import { z } from 'zod';
import { superValidate, fail, setError } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { createCollectionRequest } from '$lib/api/create-collection';

const creatCollectionSchema = z.object({
	collectionName: z.string().min(5),
	collectionAssets: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.type === 'application/zip')
});

export const load = async () => {
	const createCollectionForm = await superValidate(zod(creatCollectionSchema));
	return { createCollectionForm };
};

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
