import { filterElementAttributes } from '../utils/svg-attributes';

export const pathElement = (
    svg_data: any,
    parent_element: any,
    element_id: string
) => {


    let { attributes } = svg_data;

    const d = attributes.d
        .replace(new RegExp(/\r?\n|\r/g), "")
        .replace(new RegExp(/\r?\t|\r/g), "")

    const path = parent_element.path(d);

    filterElementAttributes(attributes, element_id);

    path.attr(attributes);

    return path;
}