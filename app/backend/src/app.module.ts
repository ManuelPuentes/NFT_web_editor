import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CollectionModule } from './modules/collection/collection.module';

import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultDataSource } from './config/data-source.config';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...defaultDataSource,
      }),
    }),
    CollectionModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
