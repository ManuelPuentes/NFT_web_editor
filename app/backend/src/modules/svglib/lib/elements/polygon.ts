
import { filterElementAttributes } from '../utils/svg-attributes';

export const polygonElement = (
    svg_data: any,
    parent_element: any,
    element_id: string
) => {

    let { attributes } = svg_data;

    const polygon = parent_element.polygon();

    filterElementAttributes(attributes, element_id)

    polygon.attr(attributes);

    return polygon;
}
