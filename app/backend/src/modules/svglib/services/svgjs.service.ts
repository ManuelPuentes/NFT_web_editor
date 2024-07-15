import { Injectable, Scope } from '@nestjs/common';
import {
  SVG,
  SVGTypeMapping,
  getWindow,
  registerWindow,
} from '@svgdotjs/svg.js';
import { svgElement } from '../lib/svgjs';
import { AssetDetails } from 'src/modules/collection/class/asset-details.class';
import { filterElementAttributes } from '../lib/utils/svg-attributes';

@Injectable()
export class SvgJsService {
  constructor() {}

  async generateSvg({
    canvas_size: { height, width },
    assets_data,
    assets_details,
    metadata,
    draw_order,
  }: GenerateSVG) {
    const canvas = await this.createCanvas({ width, height });
    const collection_assets_data = new CollectionAssetsData(assets_data);

    draw_order.map((layer) => {
      const { translate, scale, rotate, size } =
        assets_details[layer][metadata[layer]];

      this.drawLayer({
        layer_name: layer,
        trait_data: collection_assets_data.get({
          trait_name: layer,
          element_name: metadata[layer],
        }),
        parent_element: canvas,
        layer_data: { translate, scale, rotate, size },
      });
    });

    return canvas.svg();
  }

  async createCanvas({ width, height }: { width: number; height: number }) {
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
    scale: { x: number; y: number } | undefined;
    rotate: number | undefined;
    size: { width: number; height: number } | undefined;
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
