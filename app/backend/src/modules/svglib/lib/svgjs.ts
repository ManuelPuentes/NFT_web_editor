import { circleElement } from './elements/circle';
import { clipElement } from './elements/clip';
import { defsElement } from './elements/defs';
import { ellipseElement } from './elements/ellipse';
import { groupElement } from './elements/group';
import { imageElement } from './elements/image';
import { lineElement } from './elements/line';
import { linearGradientElement } from './elements/linear-grandient';
import { pathElement } from './elements/path';
import { polygonElement } from './elements/polygon';
import { polylineElement } from './elements/polyline';
import { radialGradientElement } from './elements/radial-grandient';
import { rectElement } from './elements/rect';
import { styleElement } from './elements/style';
import { textElement } from './elements/text';


import * as ElementType from './const/elements.const';


export const svgElement = (
    svg_data: any,
    parent_element: any,
    element_id: string
) => {
    const { name } = svg_data;

    let element: any;


    switch (name) {

        case ElementType.CIRCLE:
            element = circleElement(
                svg_data,
                parent_element,
                element_id
            )
            break;
        case ElementType.CLIP:
            element = clipElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.DEFS:
            element = defsElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.ELLIPSE:
            element = ellipseElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.GROUP:
            element = groupElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.IMAGE:
            element = imageElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.LINE:
            element = lineElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.LINEAR_GRADIENT:
            element = linearGradientElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.PATH:
            element = pathElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.POLYGON:
            element = polygonElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.POLYLINE:
            element = polylineElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.RADIAL_GRADIENT:
            element = radialGradientElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.RECT:
            element = rectElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.STYLE:
            element = styleElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        case ElementType.TEXT:
            element = textElement(
                svg_data,
                parent_element,
                element_id
            )
            break;

        default:
            console.log("default");
            console.log(svg_data.name);
            break;
    }


    return element;
}
