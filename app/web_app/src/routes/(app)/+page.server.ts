import { redirect, type RequestEvent } from "@sveltejs/kit";
import type { Actions } from "./$types";

import { z } from 'zod';
import { message, superValidate, fail } from "sveltekit-superforms";
import { zod } from 'sveltekit-superforms/adapters';
// import { fail } from '@sveltejs/kit';



const creatCollectionSchema = z.object({
	collectionName: z.string().min(5),
	collectionAssets:
		z.instanceof(File, { message: 'Please upload a file.' }).refine((f) => f.type === 'application/zip')
});


export const load = async () => {
	const form = await superValidate(zod(creatCollectionSchema));
	return { form };
}

export const actions: Actions = {
	createCollection: async (event: RequestEvent) => {

		const form = await superValidate(event, zod(creatCollectionSchema));


		// if (!form.valid) {
		// 	return fail(400, { form });

		// }

		// const { collectionAssets, collectionName } = form.data;


		// const formdata = new FormData();

		// formdata.append(
		// 	"assets",
		// 	collectionAssets,
		// );

		// const requestOptions = {
		// 	method: "POST",
		// 	body: formdata,
		// };

		// const params = new URLSearchParams({
		// 	"name": collectionName,
		// 	"amount": "100",
		// })


		// try {
		// 	const response = await fetch(`http://localhost:3000/collection/create?` + params, requestOptions);
		// 	const result = await response.text();
		// 	throw redirect(300, `/editor`);
		// } catch (error) {
		// 	console.error(error);
		// };

		throw redirect(300, `/editor`);


	}
} satisfies Actions;