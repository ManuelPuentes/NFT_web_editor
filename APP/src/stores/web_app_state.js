import { writable } from 'svelte/store';
import { Assets } from "../stores/assets";
import data from "../data/assets_data.json"



export const canvas_details = writable({
    canvas_bounding_rect: {},
});


export const selected_element = writable({
    element_ref: null,
    element_details: null
})


// export const data = writable({
//     assets: []

// })


export const draw_order = writable(Object.keys(data))

export const selected_items = writable({})






