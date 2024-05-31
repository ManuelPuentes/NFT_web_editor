

import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { UnzipperService } from 'src/modules/unzipper/services/unzipper.service';
import { CreateCollection } from '../interfaces/create.interface';
import { AssetDetails } from '../class/asset-details.class';
import { InvalidAssetsException } from '../exceptions/invalid-assets.exeption';
import { Collection } from '../entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SvgsonService } from '../../svgsom/services/svgson.service';

import { CryptoService } from '../../crypto/services/crypto.service';
import { SvgJsService } from 'src/modules/svglib/services/svgjs.service';


@Injectable()
export class GenerateImagesService {

    constructor(
        private readonly cryptoService: CryptoService,
        private readonly svgJsService: SvgJsService,
    ) { }

    async exec({ collection_name }: { collection_name: string }): Promise<void> {

        const draw_order: string[] = [
            'backgrounds',
            // 'basemasks',
            // 'faces',
            // 'eyes',
            // 'mouths',
            // 'signatures'
        ];

        const canvas_size = { width: 1000, height: 1000 };

        this.createOutputDirectoryIfNeeded({ collection_name });

        const assets_list = this.loadCollectionAssetsList({ collection_name });

        const assets_data = this.loadCollectionAssetsData({ assets_list, collection_name });

        const metadata = this.generateMetadata({ assets_list: assets_list });

        this.svgJsService.generateSvg({
            canvas_size,
            draw_order,
            metadata,
            assets_data
        })

    }

    loadCollectionAssetsData({ assets_list, collection_name }: { assets_list: Record<string, string[]>, collection_name: string }): Record<string, Record<string, any>> {

        const data: Record<string, Record<string, any>> = {}

        Object.keys(assets_list).map(trait => {

            data[trait] = {}

            assets_list[trait].map(element => {
                const asset_path = `./collections/${collection_name}/json/${trait}/${element}.json`;
                data[trait][element] = JSON.parse(fs.readFileSync(asset_path).toString())
            })
        });

        return data;
    }

    loadCollectionAssetsList({ collection_name }: { collection_name: string }): Record<string, string[]> {
        const assets_list_path = `./collections/${collection_name}/assets_list.json`;
        const assets_list = JSON.parse(fs.readFileSync(assets_list_path).toString());
        return assets_list;
    }

    createOutputDirectoryIfNeeded({ collection_name }: { collection_name: string }) {
        const output_path = `./collections/${collection_name}/output`;
        try {
            fs.mkdirSync(output_path);
        } catch (error) { }
    }


    generateMetadata({ assets_list }: { assets_list: Record<string, string[]> }) {
        const metadata: Record<string, string> = {};

        Object.keys(assets_list).map(key => {
            metadata[key] = assets_list[key][Math.floor(Math.random() * (assets_list[key].length - 1))]
        })

        return metadata;
    }

}

interface GenerateSVG {
    canvas_size: { width: number, height: number },
    draw_order: string[],
    metadata: Record<string, string>,
    assets_data: Record<string, Record<string, any>>
}
