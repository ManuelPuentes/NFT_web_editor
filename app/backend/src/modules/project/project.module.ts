import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CreateProjectService } from './services/create-project.service';
import { CreateProjectController } from './controllers/create-project.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UnzipperService } from '../unzipper/services/unzipper.service';

import { CreateProjectMiddleware } from './middlewares/create-project.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { GetProjectsService } from './services/get-projects.services';
import { GetProjectsController } from './controllers/get-projects.controller';

@Module({

  imports: [MulterModule.register(), TypeOrmModule.forFeature([Project])],
  controllers: [CreateProjectController, GetProjectsController],
  providers: [CreateProjectService, UnzipperService, GetProjectsService],
})
export class ProjectModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CreateProjectMiddleware)
      .forRoutes(CreateProjectController);
  }
}
