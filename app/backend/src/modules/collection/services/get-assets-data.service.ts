import { Injectable } from '@nestjs/common';
import { PathDetails } from '../interfaces/path-details.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GetAssetsJsonDataService {
  constructor() {}

  exec({
    collection_name,
  }: {
    collection_name: string;
  }): Record<string, Record<string, any>> {
    const collection_json_directory_path: string = `collections/${collection_name}/json`;

    const assets_json_data: Record<string, Record<string, any>> = {};

    const tree = fs.readdirSync(collection_json_directory_path, {
      recursive: true,
      encoding: 'utf8',
    });

    tree.map((child) => {
      const asset_path = path.join(collection_json_directory_path, child);
      const { isDirectory, dirname, filename } = this.pathDetails(asset_path);

      if (isDirectory) {
        assets_json_data[dirname] = {};
      } else if (dirname && filename) {
        const file = filename.replace('.json', '');
        assets_json_data[dirname][file] = JSON.parse(
          fs.readFileSync(asset_path, { encoding: 'utf-8' }),
        );
      }
    });

    return assets_json_data;
  }

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
