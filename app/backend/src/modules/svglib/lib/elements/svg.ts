import { svgElement } from '../svgjs';
import { filterElementAttributes } from '../utils/svg-attributes';

export const SVGElement = (
  svg_data: any,
  parent_element: any,
  element_id: string,
) => {
  const { attributes } = svg_data;
  const nested = parent_element.nested();
  filterElementAttributes(attributes, element_id);
  nested.attr(attributes);

  svg_data.children.map((element: any) => {
    svgElement(element, nested, element_id);
  });

  return nested;
};
