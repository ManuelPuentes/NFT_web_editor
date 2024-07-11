import { writable } from 'svelte/store';
import type { MoveableBounds } from '../interfaces/BoundingRect';
import type { AssetDetails } from '../interfaces/AssetDetails';
// import type MoveableComponent from 'moveable';
import type MoveableComponent from 'svelte-moveable';

export const collection_name = writable<string>('');

export const workspace_details = writable<MoveableBounds>({ left: 0, top: 0, right: 0, bottom: 0 });

export const canvas_size = writable<{ width: number; height: number }>({ width: 500, height: 500 });

export const assets_details = writable<Record<string, Record<string, AssetDetails>>>({});

export const draw_order = writable<Array<string>>(['']);

export const changes_indicator = writable(false);

export const last_selected_item_id = writable<string>('');

export const context_menu = writable<{ status: boolean; pos: { x: number; y: number } }>({
	status: false,
	pos: { x: 0, y: 0 }
});
export const selected_items = writable<Record<string, AssetDetails>>({});
export const selected_element_details = writable(null);
export const moveablea_ref = writable<MoveableComponent>();
export const canvas_ref = writable<HTMLElement>();
