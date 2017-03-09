import { join } from 'path';
import yaml from './yaml';
import { isObject } from './utils';

/**
* @param {Builder} builder
* @param {string} path - eg data/packages.yaml
*
*/
export async function packages(builder, path) {
  const data = await yaml(path);

  if (!data) {
    console.log(`${path} has no data`);
    return;
  }

  if (!isObject(data)) {
    throw new Error(`Not an object: data in ${path} must be an object with content IDs as keys`);
  }

  console.log(`${path} has ${Object.keys(data).length} package`);
  Object.entries(data).forEach(([id, data]) => builder.addPackage(id, data));
}

/**
* @param {Builder} builder
* @param {string} path - eg data/packages.yaml
*
*/
export async function articles(builder, path) {
  const data = await yaml(path);

  if (!data) {
    console.log(`${path} has no data`);
    return;
  }

  if (!isObject(data)) {
    throw new Error(`Not an object: data in ${path} must be an object with content IDs as keys`);
  }

  // TODO: custom fields (eg a topper) on articles.
}
