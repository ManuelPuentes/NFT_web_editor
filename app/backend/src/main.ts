import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true, logger: [
      'verbose', 'debug'
    ]
  });


  const configService = app.get(ConfigService);
  const port = configService.get('config.port');


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true
    }),
  );

  await app.listen(port);



}
bootstrap();
