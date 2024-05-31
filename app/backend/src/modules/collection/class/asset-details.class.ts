export class AssetDetails {
    file_name: string;
    directory_name: string;
    file_asset_path: string;
    styles: string;
    transform: string;
    scale: string;
    rotate: string;

    constructor(
        { name, directory, path }: {
            name: string,
            directory: string,
            path: string,
        }
    ) {
        this.file_name = name;
        this.directory_name = directory;
        this.file_asset_path = path;
        this.styles = "";
        this.transform = "";
        this.scale = "";
        this.rotate = "";
    }
}