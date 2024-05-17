import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnzipperService } from './services/unzipper.service';


@Module({
  providers: [ConfigService, UnzipperService],
  exports: [UnzipperService],
})
export class UnzipperModule { }
