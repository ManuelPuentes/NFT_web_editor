import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './modules/project/project.module';

import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultDataSource } from './config/data-source.config';
@Module({
  imports: [ConfigModule.forRoot({
    load: [appConfig],
    isGlobal: true,
  }),
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      ...defaultDataSource,
    }),
  }),
    ProjectModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
