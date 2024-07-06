import { filterElementAttributes } from '../utils/svg-attributes';

export const rectElement = (
  svg_data: any,
  parent_element: any,
  element_id: string,
) => {
  const { attributes } = svg_data;

  const rect = parent_element.rect(attributes['width'], attributes['height']);

  filterElementAttributes(attributes, element_id);

  rect.attr(attributes);

  return rect;
};
