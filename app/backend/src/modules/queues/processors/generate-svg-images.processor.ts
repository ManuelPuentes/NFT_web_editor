import {
  Processor,
  WorkerHost,
  OnWorkerEvent,
  InjectQueue,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { CollectionAssetsDetailsData } from 'src/modules/collection/class/collection-assets-details-data';
import { CollectionAssetsJsonData } from 'src/modules/collection/class/collection-assets-json-data.class';
import { CryptoService } from 'src/modules/crypto/services/crypto.service';
import { SvgJsService } from 'src/modules/svglib/services/svgjs.service';

export const GENERATE_SVG_IMGS = 'GENERATE_SVG_IMGS';

export const InjectSvgGeneratorQueue = (): ParameterDecorator =>
  InjectQueue(GENERATE_SVG_IMGS);

@Processor(GENERATE_SVG_IMGS)
export class generatSvgImagesProcessor extends WorkerHost {
  private readonly logger = new Logger(generatSvgImagesProcessor.name);

  constructor(
    private readonly svgJsService: SvgJsService,
    private readonly cryptoService: CryptoService,
  ) {
    super();
  }
  async process(job: Job) {
    const {
      metadata,
      collection_draw_order,
      collection_canvas_size,
      collection_assets_details,
      collection_assets_json_data,
    } = job.data;

    const hash = this.cryptoService.getHash(
      Buffer.from(JSON.stringify(metadata)),
    );

    const svg = await this.svgJsService.generateSvg({
      metadata,
      collection_draw_order,
      collection_canvas_size,
      collection_assets_details: new CollectionAssetsDetailsData(
        collection_assets_details,
      ),
      collection_assets_json_data: new CollectionAssetsJsonData(
        collection_assets_json_data,
      ),
    });

    return {
      svg,
      hash,
    };
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.log(`Active ${job.id}`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Completed ${job.id}`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    this.logger.log(`Failed ${job.id}`);
  }
}
