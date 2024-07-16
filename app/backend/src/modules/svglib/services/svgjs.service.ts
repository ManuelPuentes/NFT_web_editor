import { Injectable } from '@nestjs/common';
import { SVG, registerWindow } from '@svgdotjs/svg.js';
import { svgElement } from '../lib/svgjs';
import { GenerateSVG } from 'src/modules/collection/interfaces/generate-svg.interface';
import { BoundingRect } from 'src/modules/collection/interfaces/bounding-rect.interface';

@Injectable()
export class SvgJsService {
  constructor() {}

  async generateSvg({
    metadata,
    collection_draw_order,
    collection_canvas_size,
    collection_assets_details,
    collection_assets_json_data,
  }: GenerateSVG) {
    try {
      const canvas = await this.createCanvas(collection_canvas_size);

      collection_draw_order.map((layer_name) => {
        const element = {
          trait_name: layer_name,
          element_name: metadata[layer_name],
        };

        const trait_data = collection_assets_json_data.get(element);

        const { translate, rotate, size } =
          collection_assets_details.get(element);

        this.drawLayer({
          layer_name,
          trait_data,
          parent_element: canvas,
          layer_data: { translate, rotate, size },
        });
      });

      return canvas.svg();
    } catch (error) {
      console.log(error);
    }
  }

  async createCanvas({ width, height }: BoundingRect) {
    const { createSVGWindow } = await import('svgdom');
    const window = createSVGWindow();

    const document = window.document;

    registerWindow(window, document);

    const canvas = SVG<Element>(document.documentElement);
    canvas.size(width, height);

    return canvas;
  }

  private drawLayer({
    layer_name,
    trait_data,
    parent_element,
    layer_data,
  }: DrawLayerData) {
    const layerID = `${layer_name}`;

    const { translate, rotate, size } = layer_data;
    const nested = svgElement(trait_data, parent_element, layerID);

    if (size) nested.size(size.width, size.height);
    if (translate) nested.move(translate.x, translate.y);
    // if (rotate) nested.transform(rotate);
  }
}

interface DrawLayerData {
  layer_name: string;
  trait_data: any;
  parent_element: any;
  layer_data: {
    translate: { x: number; y: number } | undefined;
    rotate: number | undefined;
    size: { width: number; height: number } | undefined;
  };
}
