import { writable } from 'svelte/store';


export const selected_items = writable({})


export const selected_item = writable({
    file_name: null,
    file_asset_path: null,
    directory_name: null
})






