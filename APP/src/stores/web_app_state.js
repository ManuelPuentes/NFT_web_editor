import { writable } from 'svelte/store';


export const selected_items = writable({})


export const canvas_details = writable({
    canvas_bounding_rect : {},
    canvas_def_color: "#dbdbdb"
});


export const selected_element = writable({
    element_ref: null,
    element_details: null
})






