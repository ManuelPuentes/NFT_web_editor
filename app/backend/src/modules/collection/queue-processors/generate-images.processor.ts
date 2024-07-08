import { Collection } from '../entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process, Processor } from '@nestjs/bull';
import { COLLECTION_QUEUE } from '../queue/collection-queue.const';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import { SvgJsService } from 'src/modules/svglib/services/svgjs.service';
import { CryptoService } from 'src/modules/crypto/services/crypto.service';
import { PathDetails } from '../interfaces/path-details.interface';
import { GetCanvasSizeService } from '../services/get-canvas-size.service';
import { GetDrawOrderService } from '../services/get-draw-order.service';
import { GetAssetsDetailsService } from '../services/get-assets-details.service';

@Processor(COLLECTION_QUEUE)
export class GenerateImagesProcessor {
  private readonly logger = new Logger(GenerateImagesProcessor.name);

  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    private readonly svgJsService: SvgJsService,
    private readonly cryptoService: CryptoService,

    private readonly getDrawOrderService: GetDrawOrderService,
    private readonly getCanvasSizeService: GetCanvasSizeService,
    private readonly getAssetsDetailsService: GetAssetsDetailsService,
  ) {}

  @Process('generate')
  async handleJob(
    job: Job<{
      collection_name: string;
      amount: number;
    }>,
  ) {
    this.logger.debug('Start transcoding...');

    const { collection_name, amount } = job.data;
    const {
      assets_list,
      assets_data, // JSON DATA
      assets_details, // WEB APP DATA
      canvas_size,
      draw_order,
    } = await this.load(collection_name);

    const images_metadata = [];

    for (let i = 0; i < amount; i++) {
      images_metadata.push(this.generateMetadata({ assets_list }));
    }

    images_metadata.map(async (metadata) => {
      const hash = this.cryptoService.getHash(
        Buffer.from(JSON.stringify(metadata)),
      );
      const output_path = `./collections/${collection_name}/output/${hash}.svg`;

      const svg = await this.svgJsService.generateSvg({
        canvas_size,
        draw_order,
        metadata,
        assets_data,
        assets_details,
      });

      fs.writeFileSync(output_path, svg);

    });

    this.logger.debug('Transcoding completed');


    // we should update the collection status to inactive and save all the images generate on the DDBB

    job.moveToCompleted();
    job.finished();
  }

  private loadAssetsData = async ({
    directory_path,
  }: {
    directory_path: string;
  }) => {
    const assets_data: Record<string, Record<string, any>> = {};

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

    metadata = {
      aditionals: 'angel',
      backgrounds: 'background-0',
      basemasks: 'aeroboy',
      eyes: 'aeroboy',
      faces: 'aeroboy',
      fighter: 'fighter_0',
      helpers: 'ultimodragon',
      mouths: 'aeroboyclosed',
      signatures: 'aeroboy',
    };

    return metadata;
  }
}
