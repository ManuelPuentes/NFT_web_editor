import { filterElementAttributes } from '../utils/svg-attributes';

export const radialGradientElement = (
    svg_data: any,
    parent_element: any,
    element_id: string
) => {

    let { attributes } = svg_data;

    const gradient = parent_element.gradient("radial");

    filterElementAttributes(attributes, element_id);

    gradient.attr(attributes);

    svg_data.children.map((element: any) => {

        let { attributes } = element;
        const stop = gradient.stop(element.attributes['offset'], element.attributes['stop-color']);
        filterElementAttributes(attributes, element_id);
        stop.attr(attributes);
    })

    return gradient;
}