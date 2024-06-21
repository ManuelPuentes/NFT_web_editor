import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CollectionAssetsDetailsNotFoundException } from '../exceptions/collection-assets-details-not-found.exception';
import { AssetDetails } from '../interfaces/asset-details.interface';


@Injectable()
export class GetAssetsDetailsService {

    constructor() { }

    async exec({ collection_name }: { collection_name: string }): Promise<{
        assets_list: Record<string, string[]>,
        assets_details: Record<string, Record<string, AssetDetails>>
    }> {

        this.ensureCollectionWebAppStoreExist({ collection_name })
        return this.getCollectionAssetsDetails({ collection_name });
    }

    private getCollectionAssetsDetails({ collection_name }: { collection_name: string }): {
        assets_list: Record<string, string[]>,
        assets_details: Record<string, Record<string, AssetDetails>>
    } {
        const assets_list_path = `./collections/${collection_name}/assets_list.json`;
        const assets_list = JSON.parse(fs.readFileSync(assets_list_path).toString());

        const assets_details_path = `./collections/${collection_name}/data.json`;
        const assets_details = JSON.parse(fs.readFileSync(assets_details_path).toString());

        return {
            assets_list, assets_details
        };
    }

    private ensureCollectionWebAppStoreExist({ collection_name }: { collection_name: string }) {
        const path = `./collections/${collection_name}/data.json`;

        if (!fs.existsSync(path))
            throw new CollectionAssetsDetailsNotFoundException();
    }
}
