import { svgElement } from '../svgjs';
import { filterElementAttributes } from '../utils/svg-attributes';

export const groupElement = (
    svg_data: any,
    parent_element: any,
    element_id: string
) => {

    let { attributes } = svg_data;

    const group = parent_element.group();

    filterElementAttributes(attributes, element_id);

    group.attr(attributes);

    svg_data.children.map((element: any) => {

        svgElement(
            element,
            group,
            element_id
        );

    });

    return group;
}