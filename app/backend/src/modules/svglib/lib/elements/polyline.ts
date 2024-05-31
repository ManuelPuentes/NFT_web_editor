
import { filterElementAttributes } from '../utils/svg-attributes';

export const polylineElement = (
    svg_data: any,
    parent_element: any,
    element_id: string
) => {
    let { attributes } = svg_data;

    const polyline = parent_element.polyline();

    filterElementAttributes(attributes, element_id);

    polyline.attr(attributes);

    return polyline;
}