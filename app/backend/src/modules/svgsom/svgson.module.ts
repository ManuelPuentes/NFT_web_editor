import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SvgsonService } from './services/svgson.service';

@Module({
    providers: [ConfigService, SvgsonService],
    exports: [SvgsonService],
})
export class SvgsonModule { }
