import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CreateProjectService } from './services/create-project.service';
import { CreateProjectController } from './controllers/create-project.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UnzipperService } from '../unzipper/services/unzipper.service';

import { CreateProjectMiddleware } from './middlewares/create-project.middleware';

@Module({

  imports: [MulterModule.register()],
  controllers: [CreateProjectController],
  providers: [CreateProjectService, UnzipperService],
})
export class ProjectModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateProjectMiddleware)
      .forRoutes(CreateProjectController);
  }
}
