import { filterElementAttributes } from '../utils/svg-attributes';

export const lineElement = (
  svg_data: any,
  parent_element: any,
  element_id: string,
) => {
  const { attributes } = svg_data;

  const line = parent_element.line();

  filterElementAttributes(attributes, element_id);

  line.attr(attributes);

  return line;
};
