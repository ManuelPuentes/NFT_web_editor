import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './modules/project/project.module';

import appConfig from './config/app.config';
@Module({
  imports: [ConfigModule.forRoot({
    load: [appConfig],
    isGlobal: true,
  }),
    ProjectModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
