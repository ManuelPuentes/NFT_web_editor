import {
  convertClassTagIntoUniqueClassTag,
  filterElementAttributes,
} from '../utils/svg-attributes';

export const styleElement = (
  svg_data: any,
  parent_element: any,
  element_id: string,
) => {
  const { attributes } = svg_data;

  const style = parent_element.style('', {});

  filterElementAttributes(attributes, element_id);

  // style.attr(attributes);

  svg_data.children.map((element: any) => {
    const values = element.value
      .replace(new RegExp(/\r?\n|\r/g), '')
      .replace(new RegExp(/\r?\t|\r/g), '')
      .split('}');

    values.pop();

    values.map((value: any) => {
      const css_class = `${value.split('{')[0]}`;
      const styles = value.split('{')[1].split(';');
      styles.pop();

      const object: any = {};

      styles.map((rule: any) => {
        rule = rule.split(':');

        const key: string = rule[0].replace(/ /g, '');
        let value = rule[1];

        if (value.includes('url')) {
          value = `${value.split(')')[0]}-${element_id})`;
        }

        object[key] = value;
      });

      style.rule(
        convertClassTagIntoUniqueClassTag(css_class, element_id),
        object,
      );
    });
  });

  return style;
};
