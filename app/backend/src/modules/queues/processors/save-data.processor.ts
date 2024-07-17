import {
  Processor,
  WorkerHost,
  OnWorkerEvent,
  InjectQueue,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import * as fs from 'fs';
import { Repository } from 'typeorm';

import { Collection } from 'src/modules/collection/entities/collection.entity';
import { Image } from 'src/modules/collection/entities/image.entity';
import { GenerationStatus } from 'src/modules/collection/entities/enums/generation-status.enum';

export const SAVE_DATA = 'SAVE_DATA';

export const InjectSaveDataQueue = (): ParameterDecorator =>
  InjectQueue(SAVE_DATA);

@Processor(SAVE_DATA)
export class SaveDataProcessor extends WorkerHost {
  private readonly logger = new Logger(SaveDataProcessor.name);

  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
  ) {
    super();
  }

  async process(job: Job) {
    const collection_name = job.data.collection_name;
    const { id: collection_id } =
      await this.collectionRepository.findOneByOrFail({
        name: collection_name,
      });

    const generated_svgs = Object.values(
      await job.getChildrenValues<{
        hash: string;
        svg: string;
      }>(),
    );

    generated_svgs.map(async ({ hash, svg }) => {
      const output_path = `./collections/${collection_name}/output/${hash}.svg`;
      const url = `http://localhost:9999/files/${collection_name}/output/${hash}.svg`;
      await this.imagesRepository.update({ collection_id, hash }, { url });
      fs.writeFileSync(output_path, svg);
    });

    await this.updateCollectionStatus({ collection_name });
  }

  private async updateCollectionStatus({
    collection_name,
  }: {
    collection_name: string;
  }) {
    await this.collectionRepository.update(
      { name: collection_name },
      { status: GenerationStatus.INACTIVE },
    );
  }

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
