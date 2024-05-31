import { filterElementAttributes } from '../utils/svg-attributes';

export const linearGradientElement = (
    svg_data: any,
    parent_element: any,
    element_id: string
) => {

    let { attributes } = svg_data;

    const gradient = parent_element.gradient("linear");

    filterElementAttributes(attributes, element_id);

    gradient.attr(attributes);

    svg_data.children.map((element: any) => {

        let { attributes } = element;
        const stop = gradient.stop(0, "#fff")
        filterElementAttributes(attributes, element_id);
        stop.attr(attributes);
    })

    return gradient;
}