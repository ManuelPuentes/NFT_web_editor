import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Post, Query, UseGuards } from '@nestjs/common';
import { COLLECTION_QUEUE } from '../queue/collection-queue.const';

import { Queue } from 'bull';
import { CollectionMustExistGuard } from '../guards/collection-must-exist.guard';
import { GenerateImagesService } from '../services/generate-images.service';

@Controller('collection')
export class GenerateImagesController {
    // @InjectQueue(COLLECTION_QUEUE) private readonly metadataQueue: Queue
    constructor(private readonly generateImagesService: GenerateImagesService) { }

    @Post('generate-images')
    @UseGuards(CollectionMustExistGuard)
    async execute(
        @Query() { collection_name }: { collection_name: string }
    ) {
        await this.generateImagesService.exec({ collection_name })
    }
}