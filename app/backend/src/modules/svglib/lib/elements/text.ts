import { filterElementAttributes } from '../utils/svg-attributes';

export const textElement = (
  svg_data: any,
  parent_element: any,
  element_id: string,
) => {
  const { attributes } = svg_data;

  const text = parent_element.text(svg_data.children[0].value);

  filterElementAttributes(attributes, element_id);

  text.attr(attributes);

  return text;
};
