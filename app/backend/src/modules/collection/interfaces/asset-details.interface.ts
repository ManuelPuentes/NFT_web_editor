export interface AssetDetails {
  file_name: string;
  directory_name: string;
  file_asset_path: string;
  styles: string;
  rotate: number;
  scale: { x: number; y: number };
  translate: { x: number; y: number };
  size: { width: number; height: number };
}
