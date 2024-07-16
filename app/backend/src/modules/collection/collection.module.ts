import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
//entities
import { Image } from './entities/image.entity';
import { Collection } from './entities/collection.entity';
//controllers
import { CreateController } from './controllers/create.controller';
import { GetCollectionsController } from './controllers/get-collections.controller';
import { GenerateImagesController } from './controllers/generate-images.controller';
import { GetAssetDetailsController } from './controllers/get-assets-details.controller';
import { ExistController } from './controllers/collection-exist.controller';
import { SetAssetDetailsController } from './controllers/set-assets-details.controller';
import { SetDrawOrderController } from './controllers/set-draw-order.controller';
import { GetDrawOrderController } from './controllers/get-draw-order.controller';
import { GetCanvasSizeController } from './controllers/get-canvas-size.controllers';
import { SetCanvasSizeController } from './controllers/set-canvas-size.controllers';
//services
import { UnzipperService } from '../unzipper/services/unzipper.service';
import { SvgJsService } from '../svglib/services/svgjs.service';
import { SvgsonService } from '../svgsom/services/svgson.service';
import { CryptoService } from '../crypto/services/crypto.service';
import { CreateCollectionService } from './services/create.service';
import { GenerateImagesService } from './services/generate-images.service';
import { GetCollectionsService } from './services/get-collections.services';
import { GetAssetsDetailsService } from './services/get-assets-details.service';
import { SetAssetsDetailsService } from './services/set-assets-details.service';
import { SetDrawOrderService } from './services/set-draw-order.service';
import { GetDrawOrderService } from './services/get-draw-order.service';
import { GetCanvasSizeService } from './services/get-canvas-size.service';
import { SetCanvasSizeService } from './services/set-canvas-size.service';
import { GetAssetsListService } from './services/get-asset-list.service';
import { GetAssetsJsonDataService } from './services/get-assets-data.service';
import { GenerateImagesMetadataService } from './services/generate-images-metadata.service';

import { QueuesModule } from '../queues/queues.module';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forFeature([Collection, Image]),
    QueuesModule.register(),
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
    GetAssetsListService,
    GenerateImagesMetadataService,
    GetAssetsJsonDataService,
  ],
})
export class CollectionModule {}
