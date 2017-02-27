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
  const path = normalize(join(dir, data.filename));
  return writeFileAsync(path, json, 'utf8');
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
