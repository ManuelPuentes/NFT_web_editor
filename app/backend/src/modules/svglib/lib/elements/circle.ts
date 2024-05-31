
import { filterElementAttributes } from '../utils/svg-attributes';

export const circleElement = (
    svg_data: any,
    parent_element: any,
    element_id: string
) => {
    let { attributes } = svg_data;

    const circle = parent_element.circle();

    filterElementAttributes(attributes, element_id);

    circle.attr(attributes);

    return circle;
}