import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit"; 1
import type { Actions } from "./$types";

import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate, fail, setError } from "sveltekit-superforms";



const creatCollectionSchema = z.object({
	collectionName: z.string().min(5),
	collectionAssets:
		z.instanceof(File, { message: 'Please upload a file.' }).refine((f) => f.type === 'application/zip', "provided file is invalid")
});


export const load = async () => {
	const form = await superValidate(zod(creatCollectionSchema));
	return { form };
}

export const actions: Actions = {
	createCollection: async (event: RequestEvent) => {

		const form = await superValidate(event, zod(creatCollectionSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { collectionAssets, collectionName } = form.data;

		const formdata = new FormData();

		formdata.append(
			"assets",
			collectionAssets,
		);

		const requestOptions = {
			method: "POST",
			body: formdata,
		};

		const params = new URLSearchParams({
			"name": collectionName,
		})


		try {
			let response: any = await fetch(`http://localhost:3000/collection/create?` + params, requestOptions);

			if (!response.ok) {
				response = await response.json();
				return setError(form, response.message);
			}

		} catch (e:any) {
			return setError(form, "fetch failed");
		};

		throw redirect(300, `/editor/${collectionName}`);

	}
} satisfies Actions;