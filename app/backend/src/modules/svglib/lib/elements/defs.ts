import { svgElement } from '../svgjs';
import { filterElementAttributes } from '../utils/svg-attributes';

export const defsElement = (
  svg_data: any,
  parent_element: any,
  element_id: string,
) => {
  const { attributes } = svg_data;

  const defs = parent_element.defs();

  filterElementAttributes(attributes, element_id);

  defs.attr(attributes);

  svg_data.children.map((element: any) => {
    svgElement(element, defs, element_id);
  });

  return defs;
};
