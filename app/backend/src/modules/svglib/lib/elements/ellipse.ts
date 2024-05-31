
import { filterElementAttributes } from '../utils/svg-attributes';

export const ellipseElement = (
    svg_data: any,
    parent_element: any,
    element_id: string
) => {
    let { attributes } = svg_data;

    const ellipse = parent_element.ellipse();

    filterElementAttributes(attributes, element_id);

    ellipse.attr(attributes);

    return ellipse;
}