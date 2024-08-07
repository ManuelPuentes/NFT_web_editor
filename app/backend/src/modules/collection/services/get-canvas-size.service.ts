import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { BoundingRect } from '../interfaces/bounding-rect.interface';

@Injectable()
export class GetCanvasSizeService {
  constructor() {}

  async exec({ collection_name }: { collection_name: string }): Promise<any> {
    return this.getCanvasSize({ collection_name });
  }

  private getCanvasSize({
    collection_name,
  }: {
    collection_name: string;
  }): BoundingRect | void {
    const canvas_size_path = `./collections/${collection_name}/canvas_size.json`;

    if (!fs.existsSync(canvas_size_path)) {
      const default_canvas_size = { width: 800, height: 800 };

      fs.writeFileSync(canvas_size_path, JSON.stringify(default_canvas_size));

      return default_canvas_size;
    }

    return JSON.parse(fs.readFileSync(canvas_size_path).toString());
  }
}
