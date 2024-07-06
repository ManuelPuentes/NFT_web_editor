import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SvgJsService } from './services/svgjs.service';

@Module({
  providers: [ConfigService, SvgJsService],
  exports: [SvgJsService],
})
export class SvgJSModule {}
