import { Collection } from '../entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process, Processor } from '@nestjs/bull';
import { COLLECTION_QUEUE } from '../queue/collection-queue.const';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

@Processor(COLLECTION_QUEUE)
export class GenerateImagesProcessor {
  private readonly logger = new Logger(GenerateImagesProcessor.name);

  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  @Process('generate')
  handleJob(job: Job) {
    job.moveToFailed;

    this.logger.debug('Start transcoding...');
    this.logger.debug(job.data);

    const assets_list_path = `./collections/${job.data.name}/assets_list.json`;
    const output_path = `./collections/${job.data.name}/output`;
    const metadata: Record<string, any> = {};

    fs.mkdirSync(output_path);
    const data = JSON.parse(fs.readFileSync(assets_list_path).toString());

    const element = this.generateMetadata(data);

    fs.writeFileSync(`${output_path}/1.json`, JSON.stringify(element));

    this.logger.debug('Transcoding completed');
  }

  getCollectionTraits({ collection_name }: { collection_name: string }) {}

  generateMetadata({ assets_list }: { assets_list: Record<string, string[]> }) {
    const metadata: Record<string, string> = {};

    Object.keys(assets_list).map((key) => {
      metadata[key] =
        assets_list[key][Math.floor(Math.random() * assets_list[key].length)];
    });

    return metadata;
  }

  generateImage(metadata: Record<string, string>) {}
}
