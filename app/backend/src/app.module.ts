import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CollectionModule } from './modules/collection/collection.module';

import appConfig from './config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { defaultDataSource } from './config/data-source.config';
import { BullModule } from '@nestjs/bull';
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
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CollectionModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
