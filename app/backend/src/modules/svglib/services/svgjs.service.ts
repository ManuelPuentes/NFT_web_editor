import { Injectable } from '@nestjs/common';
import { SVG, registerWindow } from '@svgdotjs/svg.js';
import * as fs from 'fs';
import { svgElement } from '../lib/svgjs';
import { AssetDetails } from 'src/modules/collection/class/asset-details.class';

@Injectable()
export class SvgJsService {
  constructor() {}

  async generateSvg({
    assets_data,
    assets_details,
    metadata,
    draw_order,
    canvas_size,
  }: GenerateSVG) {
    const canvas = await this.createCanvas(canvas_size);
    const collection_assets_data = new CollectionAssetsData(assets_data);

    draw_order.map((layer) => {
      const {
        transform: translate,
        scale,
        rotate,
      } = assets_details[layer][metadata[layer]];

      this.drawLayer({
        layer_name: layer,
        trait_data: collection_assets_data.get({
          trait_name: layer,
          element_name: metadata[layer],
        }),
        parent_element: canvas,
        layer_data: { translate, scale, rotate },
      });
    });

    return canvas.svg();
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

  drawLayer({
    layer_name,
    trait_data,
    parent_element,
    layer_data,
  }: DrawLayerData) {
    try {
      const layerID = `${layer_name}`;

      const group = parent_element.group().attr('id', layerID);

      trait_data.children.map((element_data: any) => {
        svgElement(element_data, group, layerID);
      });

      // here we should add the layer tranforms (scale, translate, rotate)
    } catch (error) {}
  }
}

interface DrawLayerData {
  layer_name: string;
  trait_data: any;
  parent_element: any;
  layer_data: {
    translate: string;
    scale: string;
    rotate: string;
  };
}

interface GenerateSVG {
  canvas_size: { width: number; height: number };
  draw_order: string[];
  metadata: Record<string, string>;
  assets_data: Record<string, Record<string, any>>;
  assets_details: Record<string, Record<string, AssetDetails>>;
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
