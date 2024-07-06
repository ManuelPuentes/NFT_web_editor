import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CollectionAssetsDetailsNotFoundException } from '../exceptions/collection-assets-details-not-found.exception';
import { AssetDetails } from '../interfaces/asset-details.interface';

@Injectable()
export class GetAssetsDetailsService {
  constructor() {}

  async exec({
    collection_name,
  }: {
    collection_name: string;
  }): Promise<Record<string, Record<string, AssetDetails>>> {
    this.ensureAssetDetailsExist({ collection_name });
    return this.getCollectionAssetsDetails({ collection_name });
  }

  private getCollectionAssetsDetails({
    collection_name,
  }: {
    collection_name: string;
  }): Record<string, Record<string, AssetDetails>> {
    const assets_details_path = `./collections/${collection_name}/assets_details.json`;
    const assets_details = JSON.parse(
      fs.readFileSync(assets_details_path).toString(),
    );

    return assets_details;
  }

  private ensureAssetDetailsExist({
    collection_name,
  }: {
    collection_name: string;
  }) {
    const path = `./collections/${collection_name}/assets_details.json`;

    if (!fs.existsSync(path))
      throw new CollectionAssetsDetailsNotFoundException();
  }
}
