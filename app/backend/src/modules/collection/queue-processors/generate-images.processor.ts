import { Collection } from '../entities/collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Process, Processor } from '@nestjs/bull';
import { COLLECTION_QUEUE } from '../queue/collection-queue.const';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import { SvgJsService } from 'src/modules/svglib/services/svgjs.service';
import { CryptoService } from 'src/modules/crypto/services/crypto.service';
import { PathDetails } from '../interfaces/path-details.interface';
import { GetCanvasSizeService } from '../services/get-canvas-size.service';
import { GetDrawOrderService } from '../services/get-draw-order.service';
import { GetAssetsDetailsService } from '../services/get-assets-details.service';
import { AssetDetails } from '../interfaces/asset-details.interface';

@Processor(COLLECTION_QUEUE)
export class GenerateImagesProcessor {
  private readonly logger = new Logger(GenerateImagesProcessor.name);

  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    private readonly svgJsService: SvgJsService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Process('generate')
  async handleJob(job: Job<GenerateSVG>) {
    this.logger.debug('Start transcoding...');
    // we should update the collection status to inactive and save all the images generate on the DDBB
    const {
      metadata,
      canvas_size,
      draw_order,
      assets_data,
      assets_details,
      collection_name,
    } = job.data;

    const hash = metadata.basemasks;

    const output_path = `./collections/${collection_name}/output/${hash}.svg`;

    const svg = await this.svgJsService.generateSvg({
      canvas_size,
      draw_order,
      metadata,
      assets_data,
      assets_details,
    });

    fs.writeFileSync(output_path, svg);

    await job.moveToCompleted();

    this.logger.debug('Transcoding completed');
  }
}

interface GenerateSVG {
  collection_name: string;
  canvas_size: { width: number; height: number };
  draw_order: string[];
  metadata: Record<string, string>;
  assets_data: Record<string, Record<string, any>>;
  assets_details: Record<string, Record<string, AssetDetails>>;
}
