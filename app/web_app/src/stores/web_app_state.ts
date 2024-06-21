import { writable } from 'svelte/store';


import type { MoveableBounds } from '../interfaces/BoundingRect';
import type { AssetDetails } from "../interfaces/AssetDetails";

export const canvas_details = writable({
    canvas_bounding_rect: {},
});

export const workspace_details = writable<Record<string, MoveableBounds>>({
    workspace_bounding_rect: { left: 0, top: 0, right: 0, bottom: 0 },
});

export const selected_element_details = writable(null)


export const assets_details = writable<Record<string, Record<string, any>>>({});

export const draw_order = writable([''])

export const selected_items = writable<Record<string, AssetDetails>>({})

export const last_selected_item = writable({
    id: '',
    context_menu: false,
})







