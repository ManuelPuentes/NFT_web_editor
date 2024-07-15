import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from '../entities/collection.entity';

import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { COLLECTION_QUEUE } from '../queue/collection-queue.const';

import { GenerationStatus } from '../entities/enums/generation-status.enum';
import { CollectionGenerateImagesProccessActiveException } from '../exceptions/collection-generate-image-proccess-active.exception';
import { GetDrawOrderService } from './get-draw-order.service';
import { GetCanvasSizeService } from './get-canvas-size.service';
import { GetAssetsDetailsService } from './get-assets-details.service';

import * as fs from 'fs';
import * as path from 'path';
import { PathDetails } from '../interfaces/path-details.interface';
import { AssetDetails } from '../class/asset-details.class';

@Injectable()
export class GenerateImagesService {
  constructor(
    @InjectQueue(COLLECTION_QUEUE)
    private readonly collectionQueue: Queue,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,

    private readonly getDrawOrderService: GetDrawOrderService,
    private readonly getCanvasSizeService: GetCanvasSizeService,
    private readonly getAssetsDetailsService: GetAssetsDetailsService,
  ) {}

  async exec({
    collection_name,
    amount,
  }: {
    collection_name: string;
    amount: number;
  }): Promise<void> {
    // const collection = await this.collectionRepository.findOne({
    //   where: {
    //     name: collection_name,
    //     status: GenerationStatus.ACTIVE,
    //   },
    // });

    // if (collection) {
    //   throw new CollectionGenerateImagesProccessActiveException();
    // }

    // await this.collectionRepository.update(
    //   { name: collection_name },
    //   { status: GenerationStatus.ACTIVE },
    // );

    this.createOutputDirectoryIfNeeded({ collection_name });

    const {
      assets_list,
      assets_data, // JSON DATA
      assets_details, // WEB APP DATA
      canvas_size,
      draw_order,
    } = await this.load(collection_name);

    const images_metadata = [];

    for (let i = 0; i < amount; i++) {
      // images_metadata.push(this.generateMetadata({ assets_list }));
      images_metadata.push({
        backgrounds: assets_list['backgrounds'][2],
        basemasks: assets_list['basemasks'][i],
      });
    }

    images_metadata.map((metadata) => {
      this.collectionQueue.add('generate', {
        canvas_size,
        draw_order,
        metadata,
        assets_data,
        assets_details,
        collection_name,
      });
    });
  }

  createOutputDirectoryIfNeeded({
    collection_name,
  }: {
    collection_name: string;
  }) {
    const output_path = `./collections/${collection_name}/output`;
    try {
      fs.mkdirSync(output_path);
    } catch (error) {}
  }

  private load = async (collection_name: string) => {
    const collection_json_directory_path: string = `collections/${collection_name}/json`;

    const { assets_list } = this.loadAssetsList({
      directory_path: collection_json_directory_path,
    });

    const { assets_data } = await this.loadAssetsData({
      directory_path: collection_json_directory_path,
    });

    const [draw_order, canvas_size, assets_details] = await Promise.all([
      this.getDrawOrderService.exec({ collection_name }),
      this.getCanvasSizeService.exec({ collection_name }),
      this.getAssetsDetailsService.exec({ collection_name }),
    ]);

    return {
      assets_data,
      assets_details,
      assets_list,
      draw_order,
      canvas_size,
    };
  };

  private loadAssetsData = async ({
    directory_path,
  }: {
    directory_path: string;
  }) => {
    const assets_data: Record<string, Record<string, AssetDetails>> = {};

    const tree = fs.readdirSync(directory_path, {
      recursive: true,
      encoding: 'utf8',
    });

    tree.map((child) => {
      const asset_path = path.join(directory_path, child);
      const { isDirectory, dirname, filename } = this.pathDetails(asset_path);

      if (isDirectory) {
        assets_data[dirname] = {};
      } else if (dirname && filename) {
        const file = filename.split('.json')[0];
        assets_data[dirname][file] = JSON.parse(
          fs.readFileSync(asset_path, { encoding: 'utf-8' }),
        );
      }
    });

    return { assets_data };
  };

  private loadAssetsList = ({ directory_path }: { directory_path: string }) => {
    const assets_list: Record<string, string[]> = {};

    const tree = fs.readdirSync(directory_path, {
      recursive: true,
      encoding: 'utf8',
    });

    tree.map((child) => {
      const asset_path = path.join(directory_path, child);
      const { isDirectory, dirname, filename } = this.pathDetails(asset_path);

      if (isDirectory) {
        assets_list[dirname] = [];
      } else if (dirname && filename) {
        const file = filename.split('.json')[0];
        assets_list[dirname].push(file);
      }
    });

    return { assets_list };
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

  private generateMetadata({
    assets_list,
  }: {
    assets_list: Record<string, string[]>;
  }) {
    let metadata: Record<string, string> = {};

    Object.keys(assets_list).map((key) => {
      metadata[key] =
        assets_list[key][
          Math.floor(Math.random() * (assets_list[key].length - 1))
        ];
    });

    return metadata;
  }
}
