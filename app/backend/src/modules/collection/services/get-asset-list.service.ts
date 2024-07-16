import { Injectable } from '@nestjs/common';
import { PathDetails } from '../interfaces/path-details.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GetAssetsListService {
  constructor() {}

  exec({
    collection_name,
  }: {
    collection_name: string;
  }): Record<string, string[]> {
    const collection_assets_list_path: string = `collections/${collection_name}/assets_list.json`;

    if (!fs.existsSync(collection_assets_list_path)) {
      const assets_list = this.loadAssetsList({ collection_name });

      fs.writeFileSync(
        collection_assets_list_path,
        JSON.stringify(assets_list),
      );

      return assets_list;
    }

    return JSON.parse(fs.readFileSync(collection_assets_list_path, 'utf-8'));
  }

  private loadAssetsList = ({
    collection_name,
  }: {
    collection_name: string;
  }) => {
    const assets_list: Record<string, string[]> = {};

    const collection_assets_directory_path: string = `collections/${collection_name}/assets`;

    const tree = fs.readdirSync(collection_assets_directory_path, {
      recursive: true,
      encoding: 'utf8',
    });

    tree.map((child) => {
      const asset_path = path.join(collection_assets_directory_path, child);
      const { isDirectory, dirname, filename } = this.pathDetails(asset_path);

      if (isDirectory) {
        assets_list[dirname] = [];
      } else if (dirname && filename) {
        const file = filename.replace('.svg', '');
        assets_list[dirname].push(file);
      }
    });

    return assets_list;
  };

  private pathDetails = (_path: string): PathDetails => {
    const isDirectory = fs.lstatSync(_path).isDirectory();

    return isDirectory
      ? {
          isDirectory,
          dirname: path.basename(_path),
        }
      : {
          isDirectory: false,
          dirname: path.basename(path.dirname(_path)),
          filename: path.basename(_path),
        };
  };
}
