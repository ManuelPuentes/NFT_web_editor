export interface AssetDetails {
	file_name: string;
	directory_name: string;
	file_asset_path: string;
	styles: string;
	rotate: number | null;
	scale: { x: number; y: number } | null;
	translate: { x: number; y: number } | null;
	size: { width: number; height: number } | null;
}
