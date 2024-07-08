import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Collection } from '../entities/collection.entity';

import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { COLLECTION_QUEUE } from '../queue/collection-queue.const';

import { GenerationStatus } from '../entities/enums/generation-status.enum';
import { CollectionGenerateImagesProccessActiveException } from '../exceptions/collection-generate-image-proccess-active.exception';

@Injectable()
export class GenerateImagesService {
  constructor(
    @InjectQueue(COLLECTION_QUEUE)
    private readonly collectionQueue: Queue,
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
  ) { }

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

    this.collectionQueue.add('generate', {
      collection_name,
      amount,
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
    } catch (error) { }
  }
}
