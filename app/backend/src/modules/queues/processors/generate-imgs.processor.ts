import {
  Processor,
  WorkerHost,
  OnWorkerEvent,
  InjectQueue,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, FlowProducer } from 'bullmq';
import { GenerateImagesMetadataService } from 'src/modules/collection/services/generate-images-metadata.service';
import { GetAssetsJsonDataService } from 'src/modules/collection/services/get-assets-data.service';
import { GENERATE_SVG_IMGS } from './generate-svg-images.processor';
import { GetDrawOrderService } from 'src/modules/collection/services/get-draw-order.service';
import { GetCanvasSizeService } from 'src/modules/collection/services/get-canvas-size.service';
import { GetAssetsDetailsService } from 'src/modules/collection/services/get-assets-details.service';
import * as fs from 'fs';

export const GENERATE_IMAGES = 'GENERATE_IMAGES';

export const InjectImagesGeneratorQueue = (): ParameterDecorator =>
  InjectQueue(GENERATE_IMAGES);

@Processor(GENERATE_IMAGES)
export class generateImagesProcessor extends WorkerHost {
  private readonly logger = new Logger(generateImagesProcessor.name);

  constructor(
    private readonly getAssetsJsonDataService: GetAssetsJsonDataService,
    private readonly generateImagesMetadataService: GenerateImagesMetadataService,
    private readonly getDrawOrderService: GetDrawOrderService,
    private readonly getCanvasSizeService: GetCanvasSizeService,
    private readonly getAssetsDetailsService: GetAssetsDetailsService,
  ) {
    super();
  }

  async process(job: Job<{ collection_name: string; amount: number }>) {
    const { collection_name, amount } = job.data;

    this.createOutputDirectoryIfNeeded({ collection_name });

    const collection_data = await this.load({ collection_name });

    const imgs_metadata = await this.generateImagesMetadataService.exec({
      collection_name,
      amount,
    });

    const flowProducer = new FlowProducer();

    try {
      return await flowProducer.add({
        name: 'flow',
        queueName: 'SAVE_DATA',
        data: { collection_name },
        children: imgs_metadata.map((metadata: any) => ({
          name: 'process3',
          queueName: GENERATE_SVG_IMGS,
          data: { metadata, collection_name, ...collection_data },
        })),
      });
    } catch (err) {
      console.log(`Error adding flow ${err}`);
    }
  }

  private load = async ({ collection_name }: { collection_name: string }) => {
    const collection_assets_json_data = this.getAssetsJsonDataService.exec({
      collection_name,
    });

    const [
      collection_draw_order,
      collection_canvas_size,
      collection_assets_details,
    ] = await Promise.all([
      this.getDrawOrderService.exec({ collection_name }),
      this.getCanvasSizeService.exec({ collection_name }),
      this.getAssetsDetailsService.exec({ collection_name }),
    ]);

    return {
      collection_assets_json_data,
      collection_assets_details,
      collection_draw_order,
      collection_canvas_size,
    };
  };

  createOutputDirectoryIfNeeded({
    collection_name,
  }: {
    collection_name: string;
  }) {
    const output_path = `./collections/${collection_name}/output`;
    try {
      fs.mkdirSync(output_path);
    } catch (error) {}
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
