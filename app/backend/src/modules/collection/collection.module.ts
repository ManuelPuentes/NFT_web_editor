import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
//entities
import { Image } from './entities/image.entity';
import { Collection } from './entities/collection.entity';
//controllers
import { CreateController } from './controllers/create.controller';

import { ExistController } from './controllers/collection-exist.controller';
import { SetDrawOrderController } from './controllers/set-draw-order.controller';
import { GetDrawOrderController } from './controllers/get-draw-order.controller';
import { GetCanvasSizeController } from './controllers/get-canvas-size.controllers';
import { SetCanvasSizeController } from './controllers/set-canvas-size.controllers';
import { GetCollectionsController } from './controllers/get-collections.controller';
import { GenerateImagesController } from './controllers/generate-images.controller';
import { SetAssetDetailsController } from './controllers/set-assets-details.controller';
import { GetAssetDetailsController } from './controllers/get-assets-details.controller';
import { GetCollectionImagesController } from './controllers/get-collection-images.controllers';

//services
import { SvgJsService } from '../svglib/services/svgjs.service';
import { SvgsonService } from '../svgsom/services/svgson.service';
import { CryptoService } from '../crypto/services/crypto.service';
import { CreateCollectionService } from './services/create.service';
import { UnzipperService } from '../unzipper/services/unzipper.service';
import { SetDrawOrderService } from './services/set-draw-order.service';
import { GetDrawOrderService } from './services/get-draw-order.service';
import { GetAssetsListService } from './services/get-asset-list.service';
import { GetCanvasSizeService } from './services/get-canvas-size.service';
import { SetCanvasSizeService } from './services/set-canvas-size.service';
import { GenerateImagesService } from './services/generate-images.service';
import { GetCollectionsService } from './services/get-collections.services';
import { GetAssetsJsonDataService } from './services/get-assets-data.service';
import { GetAssetsDetailsService } from './services/get-assets-details.service';
import { SetAssetsDetailsService } from './services/set-assets-details.service';
import { GetCollectionImagesService } from './services/get-collection-images.service';
import { GenerateImagesMetadataService } from './services/generate-images-metadata.service';

import { QueuesModule } from '../queues/queues.module';
import { GetStatusController } from './controllers/get-collection-status.controller';
import { GetCollectionStatusService } from './services/get-collection-status.service';

@Module({
  imports: [
    MulterModule.register(),
    TypeOrmModule.forFeature([Collection, Image]),
    QueuesModule.register(),
  ],
  controllers: [
    ExistController,
    CreateController,
    GetStatusController,
    SetDrawOrderController,
    SetCanvasSizeController,
    GetDrawOrderController,
    GetCanvasSizeController,
    GetCollectionsController,
    SetAssetDetailsController,
    GetAssetDetailsController,
    GenerateImagesController,
    GetCollectionImagesController,
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
    GetCollectionImagesService,
    GetCollectionStatusService,
  ],
})
export class CollectionModule { }
