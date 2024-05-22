import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const DEFAULT_DATA_SOURCE_NAME = 'default';

export const defaultDataSource: TypeOrmModuleOptions = {
  type: 'postgres',
  name: DEFAULT_DATA_SOURCE_NAME,
  url: process.env.DATABASE_URL,
  logging: true,
  synchronize: false,
  migrationsRun: true,
  entities: [path.join(__dirname, `/../modules/**/*.entity.{ts,js}`)],
  migrations: [path.join(__dirname, `/../data-source/migrations/*.{ts,js}`)],
  migrationsTableName: 'migrations',
  uuidExtension: 'uuid-ossp',
  installExtensions: true,
  connectTimeoutMS: 10000,
  extra: {
    poolSize: 30,
  },
};

export default new DataSource(defaultDataSource as DataSourceOptions);
