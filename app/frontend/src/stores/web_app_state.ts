import { writable } from 'svelte/store';
import type { AssetDetails } from '../interfaces/asset_details.interface';
import type InfiniteViewerComponent from 'svelte-infinite-viewer';
import type MoveableComponent from 'svelte-moveable';

export const assets_details = writable<Record<string, Record<string, AssetDetails>>>({});
export const selected_items = writable<Record<string, AssetDetails>>({});
export const draw_order = writable<string[]>([]);

// Canvas
export const canvas_ref = writable<HTMLElement>();
export const canvas_size = writable<{ width: number; height: number }>({ width: 800, height: 800 });

// Workspace
export const viewer_ref = writable<InfiniteViewerComponent>(undefined);
export const use_mouse_drag = writable(true);

// Image
export const last_selected_item_id = writable<string>('');

//ImageContextMenu
export const context_menu = writable<{ status: boolean; pos: { x: number; y: number } }>({
	status: false,
	pos: { x: 0, y: 0 }
});

export const moveablea_ref = writable<MoveableComponent>();
