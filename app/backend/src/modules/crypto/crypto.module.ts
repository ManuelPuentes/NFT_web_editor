import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CryptoService } from './services/crypto.service';

@Module({
  providers: [ConfigService, CryptoService],
  exports: [CryptoService],
})
export class CryptoModule {}
