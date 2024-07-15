export class AssetDetails {
  file_name: string;
  directory_name: string;
  file_asset_path: string;
  styles: string;
  rotate: number | undefined;
  scale: { x: number; y: number } | undefined;
  translate: { x: number; y: number } | undefined;
  size: { width: number; height: number } | undefined;

  constructor({
    name,
    directory,
    path,
  }: {
    name: string;
    directory: string;
    path: string;
  }) {
    this.file_name = name;
    this.directory_name = directory;
    this.file_asset_path = path;
    this.styles = '';
    this.rotate = 0;
    this.scale = { x: 0, y: 0 };
    this.translate = { x: 0, y: 0 };
    this.size = { width: 0, height: 0 };
  }
}
