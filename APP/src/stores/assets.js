import { readable } from 'svelte/store';
import data from "../data/assets_data.json"

export const Assets = readable(null, set => {
	set(data);
	return () => {};
});