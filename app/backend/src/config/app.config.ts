import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: process.env.PORT || 3000,
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: +(process.env.REDIS_PORT || 6379),
  };
});
