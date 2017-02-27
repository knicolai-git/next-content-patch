import yaml from './yaml';
import { isObject } from './utils';

/**
* @param {Builder} builder
* @param {string} dir - the folder where yaml data is
* @param {string} filename - eg packages.yaml
*
*/
export async function packages(builder, dir = 'data', filename = 'packages.yaml') {
  const data = await yaml(filename, { dir });

  if (!data) {
    console.log(`${filename} has no data`);
    return;
  }

  if (!isObject(data)) {
    throw new Error(`Not an object: ${filename} must be an object with content IDs as keys`);
  }

  console.log(`${filename} has ${Object.keys(data).length} package`);

  Object.entries(data).forEach(([id, {description, contains}]) => {
    // Only pass on properties we're expecting
    builder.addPackage({id, description, contains});
  });
}

/**
* @param {Builder} builder
* @param {string} dir - the folder where yaml data is
* @param {string} filename - eg packages.yaml
*
*/
export async function articles(builder, dir = 'data', filename = 'articles.yaml') {
  const data = await yaml(filename, { dir });

  if (!data) {
    console.log(`${filename} has no data`);
    return;
  }

  if (!isObject(data)) {
    throw new Error(`Not an object: ${filename} must be an object with content IDs as keys`);
  }

  // TODO: custom fields (eg a topper) on articles.
}
