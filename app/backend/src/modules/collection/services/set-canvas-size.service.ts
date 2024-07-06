import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { SetCanvasSize } from '../interfaces/set-canvas-size.interface';

@Injectable()
export class SetCanvasSizeService {
  constructor() {}

  async exec({ collection_name, size }: SetCanvasSize): Promise<void> {
    fs.writeFileSync(
      `./collections/${collection_name}/canvas_size.json`,
      JSON.stringify(size),
    );
  }
}
