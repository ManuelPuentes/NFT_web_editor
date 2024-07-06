import { Injectable } from '@nestjs/common';
import { SVG, registerWindow } from '@svgdotjs/svg.js';
import * as fs from 'fs';
import { svgElement } from '../lib/svgjs';

@Injectable()
export class SvgJsService {
  constructor() {}

  async generateSvg({
    assets_data,
    metadata,
    draw_order,
    canvas_size,
  }: GenerateSVG) {
    const canvas = await this.createCanvas(canvas_size);

    fs.writeFileSync(`./collections/luchamask/output/test.svg`, canvas.svg());

    const collection_assets_data = new CollectionAssetsData(assets_data);

    draw_order.map((layer) => {
      console.log(metadata[layer]);

      this.drawLayer({
        layer_name: layer,
        trait_data: collection_assets_data.get({
          trait_name: layer,
          element_name: metadata[layer],
        }),
        parent_element: canvas,
      });
    });

    fs.writeFileSync('./collections/luchamask/output/test.svg', canvas.svg());
  }

  private async createCanvas({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) {
    const { createSVGWindow } = await import('svgdom');
    const window = createSVGWindow();

    const document = window.document;

    registerWindow(window, document);

    const canvas = SVG<Element>(document.documentElement);

    canvas.size(width, height);

    return canvas;
  }

  drawLayer({ layer_name, trait_data, parent_element }: DrawLayerData) {
    try {
      const layerID = `${layer_name}`;

      const group = parent_element.group().attr('id', layerID);

      trait_data.children.map((element_data: any) => {
        svgElement(element_data, group, layerID);
      });
    } catch (error) {}
  }
}

interface DrawLayerData {
  layer_name: string;
  trait_data: any;
  parent_element: any;
}

interface GenerateSVG {
  canvas_size: { width: number; height: number };
  draw_order: string[];
  metadata: Record<string, string>;
  assets_data: Record<string, Record<string, any>>;
}

class CollectionAssetsData {
  data: Record<string, Record<string, any>>;

  constructor(data: Record<string, Record<string, any>>) {
    this.data = data;
  }

  get({
    trait_name,
    element_name,
  }: {
    trait_name: string;
    element_name: string;
  }): any {
    return this.data[trait_name][element_name];
  }
}
