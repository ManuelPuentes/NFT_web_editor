export const filterElementAttributes = (
  attributes: Record<string, string>,
  element_id: string,
) => {
  if (attributes) {
    Object.keys(attributes).map((attr_key) => {
      switch (true) {
        case isClass(attr_key, attributes, element_id):
        case isID(attr_key, attributes, element_id):
        case isXlinkHref(attr_key, attributes, element_id):
        case isURL(attr_key, attributes, element_id):
        case isURL(attr_key, attributes, element_id):
        case isInskcape(attr_key, attributes):
        case IsSodipodi(attr_key, attributes):
      }
    });
  }
};

const isClass = (
  attr_key: string,
  attributes: Record<string, string>,
  id: string,
) => {
  if (attr_key == 'class') {
    const class_name = convertClassTagIntoUniqueClassTag(
      attributes[attr_key],
      id,
    );
    attributes[attr_key] = class_name;
    return true;
  }
  return false;
};

const isID = (
  attr_key: string,
  attributes: Record<string, string>,
  id: string,
) => {
  if (attr_key == 'id') {
    attributes[attr_key] = `${attributes.id}-${id}`;
    return true;
  }
  return false;
};

const isXlinkHref = (
  attr_key: string,
  attributes: Record<string, string>,
  id: string,
) => {
  if (attr_key == 'xlink:href') {
    attributes[attr_key] = `${attributes[attr_key]}-${id}`;
    return true;
  }
  return false;
};

const isURL = (
  attr_key: string,
  attributes: Record<string, string>,
  id: string,
) => {
  if (attributes[attr_key].includes('url')) {
    const url = attributes[attr_key];
    const new_attr_value = `${url.split(')')[0]}-${id})`;
    attributes[attr_key] = new_attr_value;
    return true;
  }
  return false;
};

const isInskcape = (attr_key: string, attributes: Record<string, string>) => {
  if (attr_key.includes('inkscape')) {
    delete attributes[attr_key];
    return true;
  }
  return false;
};

const IsSodipodi = (attr_key: string, attributes: Record<string, string>) => {
  if (attr_key.includes('sodipodi')) {
    delete attributes[attr_key];
    return true;
  }
  return false;
};

export const convertClassTagIntoUniqueClassTag = (
  css_class: string,
  unique_tag: string,
) => {
  const classes = css_class.replace(/ /g, '').split(',');
  let unique_class = '';

  classes.map((_class) => {
    unique_class += `${_class}-${unique_tag}, `;
  });

  // erase the last two chars bc the loop above always adds (",(espace)") so we want to erase the last 2 of them
  unique_class = unique_class.slice(0, unique_class.length - 2);

  return unique_class;
};
