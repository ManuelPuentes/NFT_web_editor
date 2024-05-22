

import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { UnzipperService } from 'src/modules/unzipper/services/unzipper.service';
import { CreateProject } from '../interfaces/create-project.interface';
import { AssetDetails } from '../class/asset-details.class';
import { InvalidProjecAssetsException } from '../exceptions/invalid-project-assets.exeption';
import { Project } from '../entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class CreateProjectService {

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        private readonly unzipperService: UnzipperService,

    ) { }

    async exec({ name, assets, amount }: CreateProject): Promise<any> {

        const extractedAssetsDirectoryPath: string = `${assets.destination}/${assets.originalname.split('.zip')[0]}`;

        await this.unzipperService.unzipFile(assets.path);

        fs.rmSync(assets.path);


        this.ensureProjectAssets({ assets_path: extractedAssetsDirectoryPath, project_path: assets.destination })

        this.ensureProjectAssetsFolderName({ assets_path: extractedAssetsDirectoryPath })

        this.createWebAppAssetsStore({
            input_path: extractedAssetsDirectoryPath,
            project_name: name,
            output_path: assets.destination
        })

        await this.projectRepository.save({
            name,
            amount
        })
    }

    private createWebAppAssetsStore = (

        {
            input_path,
            project_name,
            output_path
        }:
            {
                input_path: string,
                project_name: string,
                output_path: string

            }
    ): void => {

        const store: Record<string, Record<string, AssetDetails>> = {};
        this.processDirectory({ input_path, project_name, store });

        fs.writeFileSync(`${output_path}/data.json`, JSON.stringify(store))

    }


    private processDirectory(
        {
            input_path,
            project_name,
            store

        }:
            {
                input_path: string,
                project_name: string,
                store: Record<string, Record<string, AssetDetails>>
            }
    ) {

        if (fs.lstatSync(input_path).isDirectory()) {

            let traits_list: Record<string, AssetDetails> = {};

            const directory = path.basename(input_path);

            fs.readdirSync(input_path).map((inner_path) => {

                const data = this.processDirectory(
                    { input_path: path.join(input_path, inner_path), project_name, store }
                );

                if (data)
                    traits_list[data.file_name] = { ...data };

            });

            if (Object.keys(traits_list).length > 0) {
                store[directory] = traits_list;
            }


        } else {

            const directory = path.basename(path.dirname(input_path));
            const file_name = (path.basename(input_path)).replace('.svg', '');
            const asset_path = `http://localhost:9999/files/${project_name}/assets/${directory}/${path.basename(input_path)}`;

            return new AssetDetails({ name: file_name, directory, path: asset_path })
        }
    }


    private ensureProjectAssets({ assets_path, project_path }: { assets_path: string, project_path: string }) {
        if (!fs.lstatSync(assets_path).isDirectory()) {
            fs.rmSync(project_path, { recursive: true })
            throw new InvalidProjecAssetsException();
        }
    }

    private ensureProjectAssetsFolderName({ assets_path }: { assets_path: string }) {

        if (path.basename(assets_path) !== 'assets') {
            fs.renameSync(assets_path, assets_path.replace(path.basename(assets_path), 'assets'))
        }
    }

}
