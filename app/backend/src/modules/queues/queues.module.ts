import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BasicAuthMiddleware } from './middleware/middleare';

import { Image } from '../collection/entities/image.entity';
import { Collection } from '../collection/entities/collection.entity';

import { ConfigType } from '@nestjs/config';
import appConfig from 'src/config/app.config';

import {
  SAVE_DATA,
  SaveDataProcessor,
  InjectSaveDataQueue,
} from './processors/save-data.processor';

import {
  GENERATE_IMAGES,
  generateImagesProcessor,
  InjectImagesGeneratorQueue,
} from './processors/generate-imgs.processor';

import {
  GENERATE_SVG_IMGS,
  generatSvgImagesProcessor,
  InjectSvgGeneratorQueue,
} from './processors/generate-svg-images.processor';

import {
  CREATE_COLLECTION,
  InjectCreateCollectionQueue,
  createCollectionProcessor,
} from './processors/create-project.processor';

import { SvgJsService } from '../svglib/services/svgjs.service';
import { GetAssetsListService } from '../collection/services/get-asset-list.service';
import { GetAssetsJsonDataService } from '../collection/services/get-assets-data.service';
import { GenerateImagesMetadataService } from '../collection/services/generate-images-metadata.service';
import { GetDrawOrderService } from '../collection/services/get-draw-order.service';
import { GetAssetsDetailsService } from '../collection/services/get-assets-details.service';
import { GetCanvasSizeService } from '../collection/services/get-canvas-size.service';
import { CryptoService } from '../crypto/services/crypto.service';
import { SvgsonService } from '../svgsom/services/svgson.service';

@Module({})
export class QueuesModule implements NestModule {
  static register(): DynamicModule {
    const createCollectionQueue = BullModule.registerQueue({
      name: CREATE_COLLECTION,
    });

    if (!createCollectionQueue.providers || !createCollectionQueue.exports) {
      throw new Error('Unable to build createCollectionQueue');
    }

    const imagesQueue = BullModule.registerQueue({
      name: GENERATE_IMAGES,
    });

    if (!imagesQueue.providers || !imagesQueue.exports) {
      throw new Error('Unable to build imagesQueue');
    }

    const svgGeneratorQueue = BullModule.registerQueue({
      name: GENERATE_SVG_IMGS,
    });

    if (!svgGeneratorQueue.providers || !svgGeneratorQueue.exports) {
      throw new Error('Unable to build svgGeneratorQueue');
    }

    const saveDataQueue = BullModule.registerQueue({
      name: SAVE_DATA,
    });

    if (!saveDataQueue.providers || !saveDataQueue.exports) {
      throw new Error('Unable to build saveDataQueue');
    }

    const flow = BullModule.registerFlowProducer({
      name: 'IMAGE_GENERATION_FLOW',
    });

    if (!flow.providers || !flow.exports) {
      throw new Error('Unable to build flow');
    }

    return {
      module: QueuesModule,
      imports: [
        BullModule.forRootAsync({
          inject: [appConfig.KEY],
          useFactory: (configService: ConfigType<typeof appConfig>) => ({
            connection: {
              host: configService.redisHost,
              port: configService.redisPort,
            },
            defaultJobOptions: {
              attempts: 3,
              backoff: {
                type: 'exponential',
                delay: 1000,
              },
              removeOnComplete: true,
            },
          }),
        }),
        createCollectionQueue,
        imagesQueue,
        svgGeneratorQueue,
        saveDataQueue,
        flow,
        TypeOrmModule.forFeature([Collection, Image]),
      ],
      providers: [
        createCollectionProcessor,
        SaveDataProcessor,
        generateImagesProcessor,
        generatSvgImagesProcessor,
        ...createCollectionQueue.providers,
        ...imagesQueue.providers,
        ...saveDataQueue.providers,
        ...svgGeneratorQueue.providers,
        ...flow.providers,
        SvgJsService,
        GetAssetsJsonDataService,
        GetAssetsListService,
        GenerateImagesMetadataService,
        GetDrawOrderService,
        GetCanvasSizeService,
        GetAssetsDetailsService,
        CryptoService,
        SvgsonService,
      ],
      exports: [
        ...createCollectionQueue.exports,
        ...imagesQueue.exports,
        ...saveDataQueue.exports,
        ...svgGeneratorQueue.exports,
        ...flow.exports,
      ],
    };
  }

  constructor(
    @InjectCreateCollectionQueue()
    private readonly createCollectionQueue: Queue,
    @InjectImagesGeneratorQueue() private readonly imgsQueue: Queue,
    @InjectSaveDataQueue() private readonly saveQueue: Queue,
    @InjectSvgGeneratorQueue() private readonly svgQueue: Queue,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/queues');

    createBullBoard({
      queues: [
        new BullMQAdapter(this.imgsQueue),
        new BullMQAdapter(this.saveQueue),
        new BullMQAdapter(this.svgQueue),
        new BullMQAdapter(this.createCollectionQueue),
      ],
      serverAdapter,
    });
    consumer
      .apply(BasicAuthMiddleware, serverAdapter.getRouter())
      .forRoutes('/queues');
  }
}
