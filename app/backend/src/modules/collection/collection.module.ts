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
import { SvgsonService} from '../svgsom/services/svgson.service';
import { CryptoService } from '../crypto/services/crypto.service';
import { CreateCollectionService } from './services/create.service';
import { UnzipperService } from '../unzipper/services/unzipper.service';
import { GenerateImagesService } from './services/generate-images.service';
import { GetCollectionsService } from './services/get-collections.services';
import { GetAssetsDetailsService } from './services/get-assets-details.service';
import { GenerateImagesProcessor } from './queue-processors/generate-images.processor';
import { COLLECTION_QUEUE } from './queue/collection-queue.const';


@Module({

  imports: [MulterModule.register(), TypeOrmModule.forFeature([Collection]), BullModule.registerQueue({
    name: COLLECTION_QUEUE,
  }),],
  controllers: [
    CreateController,
    GetCollectionsController,
    GenerateImagesController,
    GetAssetDetailsController
  ],
  providers: [
    CryptoService,
    SvgsonService,
    SvgJsService,
    UnzipperService,
    GetCollectionsService,
    CreateCollectionService,
    GenerateImagesProcessor,
    GetAssetsDetailsService,
    GenerateImagesService,
  ],
})
export class CollectionModule { }
