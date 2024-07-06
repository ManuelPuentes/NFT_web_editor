import { svgElement } from '../svgjs';
import { filterElementAttributes } from '../utils/svg-attributes';

export const clipElement = (
  svg_data: any,
  parent_element: any,
  element_id: string,
) => {
  const { attributes } = svg_data;

  const clip = parent_element.clip();

  filterElementAttributes(attributes, element_id);

  svg_data.children.map((element: any) => {
    clip.add(svgElement(element, clip, element_id));
  });

  clip.attr(attributes);

  return clip;
};
