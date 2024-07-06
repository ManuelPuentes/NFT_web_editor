import { filterElementAttributes } from '../utils/svg-attributes';

export const imageElement = (
  svg_data: any,
  parent_element: any,
  element_id: string,
) => {
  const { attributes } = svg_data;

  const image = parent_element.image();

  filterElementAttributes(attributes, element_id);

  image.attr(attributes);

  return image;
};
