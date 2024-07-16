import {
  Processor,
  WorkerHost,
  OnWorkerEvent,
  InjectQueue,
} from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import { SvgsonService } from 'src/modules/svgsom/services/svgson.service';
import { PathDetails } from 'src/modules/collection/interfaces/path-details.interface';

export const CREATE_COLLECTION = 'CREATE_COLLECTION';

export const InjectCreateCollectionQueue = (): ParameterDecorator =>
  InjectQueue(CREATE_COLLECTION);

@Processor(CREATE_COLLECTION)
export class createCollectionProcessor extends WorkerHost {
  private readonly logger = new Logger(createCollectionProcessor.name);

  constructor(private readonly svgsonService: SvgsonService) {
    super();
  }

  async process(job: Job<{ collection_name: string; assets_path: string }>) {
    const { assets_path, collection_name } = job.data;

    this.processDirectoryTree({
      collection_name,
      directory_path: assets_path,
    });
  }

  private processDirectoryTree = ({
    directory_path,
    collection_name,
  }: {
    directory_path: string;
    collection_name: string;
  }) => {
    const tree = fs.readdirSync(directory_path, {
      recursive: true,
      encoding: 'utf8',
    });
    tree.map((child) => {
      const { isDirectory, dirname, filename } = this.pathDetails(
        path.join(directory_path, child),
      );

      if (isDirectory) {
        this.createAssetJsonFolder({ dirname, collection_name });
      } else if (filename) {
        this.convertSvgAssetToJSon({ filename, dirname, collection_name });
      }
    });
  };

  private convertSvgAssetToJSon = ({
    dirname,
    filename,
    collection_name,
  }: {
    dirname: string;
    filename: string;
    collection_name: string;
  }): void => {
    const file_path = `collections/${collection_name}/assets/${dirname}/${filename}`;
    const json_path = `collections/${collection_name}/json/${dirname}/${filename.replace('.svg', '.json')}`;

    const svg_json = this.svgsonService.parseToJson({ file_path });

    fs.writeFileSync(json_path, JSON.stringify(svg_json));
  };

  private createAssetJsonFolder = ({
    dirname,
    collection_name,
  }: {
    dirname: string;
    collection_name: string;
  }) => {
    fs.mkdirSync(`collections/${collection_name}/json/${dirname}`, {
      recursive: true,
    });
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

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.log(`Active ${job.id}`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Completed ${job.id}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    this.logger.log(`Failed ${job.id}`);
  }
}
