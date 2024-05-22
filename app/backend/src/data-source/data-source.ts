import { DataSource, DataSourceOptions } from 'typeorm';

import { defaultDataSource } from '../config/data-source.config';

export default new DataSource(defaultDataSource as DataSourceOptions);
