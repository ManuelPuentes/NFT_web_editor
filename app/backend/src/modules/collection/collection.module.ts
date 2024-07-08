import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { Collection } from './entities/collection.entity';
import { CreateController } from './controllers/create.controller';
import { GetCollectionsController } from './controllers/get-collections.controller';
import { GenerateImagesController } from './controllers/generate-images.controller';
import { GetAssetDetailsController } from './controllers/get-assets-details.controller';
import { SvgJsService } from '../svglib/services/svgjs.service';
import { SvgsonService } from '../svgsom/services/svgson.service';
import { CryptoService } from '../crypto/services/crypto.service';
import { CreateCollectionService } from './services/create.service';
import { UnzipperService } from '../unzipper/services/unzipper.service';
import { GenerateImagesService } from './services/generate-images.service';
import { GetCollectionsService } from './services/get-collections.services';
import { GetAssetsDetailsService } from './services/get-assets-details.service';
import { GenerateImagesProcessor } from './queue-processors/generate-images.processor';
import { COLLECTION_QUEUE } from './queue/collection-queue.const';
import { ExistController } from './controllers/collection-exist.controller';
import { CreateCollectionProcessor } from './queue-processors/create-collection.processor';
import { SetAssetDetailsController } from './controllers/set-assets-details.controller';
import { SetAssetsDetailsService } from './services/set-assets-details.service';
import { SetDrawOrderController } from './controllers/set-draw-order.controller';
import { GetDrawOrderController } from './controllers/get-draw-order.controller';
import { SetDrawOrderService } from './services/set-draw-order.service';
import { GetDrawOrderService } from './services/get-draw-order.service';
import { GetCanvasSizeController } from './controllers/get-canvas-size.controllers';
import { GetCanvasSizeService } from './services/get-canvas-size.service';
import { SetCanvasSizeController } from './controllers/set-canvas-size.controllers';
import { SetCanvasSizeService } from './services/set-canvas-size.service';
import { Image } from './entities/image.entity';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forFeature([Collection, Image]),
    BullModule.registerQueue({
      name: COLLECTION_QUEUE,
    }),
  ],
  controllers: [
    ExistController,
    CreateController,
    SetDrawOrderController,
    SetCanvasSizeController,
    GetDrawOrderController,
    GetCanvasSizeController,
    GetCollectionsController,
    SetAssetDetailsController,
    GetAssetDetailsController,
    GenerateImagesController,
  ],
  providers: [
    SvgJsService,
    CryptoService,
    SvgsonService,
    UnzipperService,
    CreateCollectionService,
    SetDrawOrderService,
    SetCanvasSizeService,
    GetDrawOrderService,
    GetCanvasSizeService,
    GetCollectionsService,
    GetAssetsDetailsService,
    SetAssetsDetailsService,
    GenerateImagesService,
    GenerateImagesProcessor,
    CreateCollectionProcessor,
  ],
})
export class CollectionModule {}
