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
import { SvgsonService } from 'src/modules/svgsom/services/svgson.service';
import { PathDetails } from '../interfaces/path-details.interface';


@Injectable()
export class CreateCollectionService {

    constructor(
        @InjectRepository(Collection)
        private readonly collectionsRepository: Repository<Collection>,
        private readonly unzipperService: UnzipperService,
        private readonly svgson: SvgsonService,

    ) { }

    async exec({ name, assets, amount }: CreateCollection): Promise<void> {

        const extractedAssetsDirectoryPath: string = `${assets.destination}/${assets.originalname.split('.zip')[0]}`;

        await this.unzipperService.unzipFile(assets.path);

        fs.rmSync(assets.path);

        this.ensureAssets({ assets_path: extractedAssetsDirectoryPath, collection_path: assets.destination });

        const { assets_details, structure } = this.processDirectoryTree({ directory_path: extractedAssetsDirectoryPath, collection_name: name });

        fs.writeFileSync(`${assets.destination}/assets_list.json`, JSON.stringify(structure));
        fs.writeFileSync(`${assets.destination}/data.json`, JSON.stringify(assets_details));
    }


    private ensureAssets({ assets_path, collection_path }: { assets_path: string, collection_path: string }) {
        if (!fs.lstatSync(assets_path).isDirectory()) {
            fs.rmSync(collection_path, { recursive: true })
            throw new InvalidAssetsException();
        }

        this.ensureAssetsFolderName({ assets_path })
    }

    private ensureAssetsFolderName({ assets_path }: { assets_path: string }) {
        if (path.basename(assets_path) !== 'assets') {
            fs.renameSync(assets_path, assets_path.replace(path.basename(assets_path), 'assets'))
        }
    }

    private pathDetails = (_path: string): PathDetails => {

        const isDirectory = fs.lstatSync(_path).isDirectory();

        return (isDirectory) ?
            {
                isDirectory,
                dirname: path.basename(_path)
            } :
            {
                isDirectory: false,
                dirname: path.basename(path.dirname(_path)),
                filename: (path.basename(_path))
            }

    }

    private processDirectoryTree = (
        { directory_path, collection_name }: { directory_path: string, collection_name: string }
    ) => {
        const tree = fs.readdirSync(directory_path, { recursive: true, encoding: 'utf8' });

        const structure: Record<string, string[]> = {};

        const assets_details: Record<string, Record<string, AssetDetails>> = {};


        tree.map(child => {

            const { isDirectory, dirname, filename } = this.pathDetails(path.join(directory_path, child));

            if (isDirectory) {

                structure[dirname] = [];

                this.createAssetJsonFolder({ dirname, collection_name });

            } else if (filename) {

                structure[dirname].push(filename.split(".svg")[0])

                this.loadAssetsDetails({ filename, dirname, collection_name, assets_details });

                this.convertSvgAssetToJSon({ filename, dirname, collection_name });
            }
        })

        return { structure, assets_details };
    }

    private convertSvgAssetToJSon = ({ dirname, filename, collection_name }: {
        dirname: string,
        filename: string,
        collection_name: string
    }): void => {

        const file_path = `collections/${collection_name}/assets/${dirname}/${filename}`;
        const json_path = `collections/${collection_name}/json/${dirname}/${filename.replace('.svg', '.json')}`;

        const svg_json = this.svgson.parseToJson({ file_path });

        fs.writeFileSync(json_path, JSON.stringify(svg_json))
    }

    private loadAssetsDetails = ({
        dirname,
        filename,
        assets_details,
        collection_name
    }: {
        dirname: string,
        filename: string,
        collection_name: string,
        assets_details: Record<string, Record<string, AssetDetails>>
    }): void => {

        const asset_path = `http://localhost:9999/files/${collection_name}/assets/${dirname}/${filename}`;

        const details = new AssetDetails({ name: filename, directory: dirname, path: asset_path });

        if (!assets_details[dirname]) {
            assets_details[dirname] = {}
        }

        assets_details[dirname][filename.replace('.svg', '')] = details;
    }

    private createAssetJsonFolder = ({
        dirname,
        collection_name

    }: {
        dirname: string,
        collection_name: string
    }) => {

        fs.mkdirSync(`collections/${collection_name}/json/${dirname}`, { recursive: true });
    }
}
