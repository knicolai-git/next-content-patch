import { normalize, join } from 'path';
import { writeFile } from 'fs';
import { map, promisify } from 'bluebird';

const writeFileAsync = promisify(writeFile);

/*
  Writes an individual Content data to disk in JSON format
*/
export function writeContentJSON(data, { dir = 'data'}) {
  if (!data.id) throw new Error('Content ID required');
  const json = JSON.stringify(data, null, ' ');

  // Don't write an empty JSON file
  if (!json || json === '{}') return Promise.resolve(null);

  const path = normalize(join(dir, data.filename));

  // resolve with the file path of the new file
  return writeFileAsync(path, json, 'utf8').then(() => path);
}

/*
  Write all contents of a Builder to a directory
  Each Content is written as a separate JSON file
*/
export function writeBuilder(builder, dir) {
  return map(
    builder.content.values(),
    content => writeContentJSON(content, { dir })
  );
}
