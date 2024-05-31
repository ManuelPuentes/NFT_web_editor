import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { CollectionAssetsDetailsNotFoundException } from '../exceptions/collection-assets-details-not-found.exception';


@Injectable()
export class GetAssetsDetailsService {

    constructor() { }

    async exec({ collection_name }: { collection_name: string }): Promise<Record<string, string[]>> {

        this.ensureCollectionWebAppStoreExist({ collection_name })
        return this.getCollectionAssetsDetails({ collection_name });
    }

    private getCollectionAssetsDetails({ collection_name }: { collection_name: string }): Record<string, string[]> {
        const assets_list_path = `./collections/${collection_name}/assets_list.json`;
        const data = JSON.parse(fs.readFileSync(assets_list_path).toString());
        return data;
    }

    private ensureCollectionWebAppStoreExist({ collection_name }: { collection_name: string }) {
        const path = `./collections/${collection_name}/data.json`;

        if (!fs.existsSync(path))
            throw new CollectionAssetsDetailsNotFoundException();
    }
}
