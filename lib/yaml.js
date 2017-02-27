import { normalize, join } from 'path';
import { readFile } from 'fs';
import { safeLoad, YAMLException } from 'js-yaml';
import { promisify } from 'bluebird';

const readFileAsync = promisify(readFile);

// Read a file and parse as YAML
export default function(filename, { dir = 'data'}) {
  const path = normalize(join(dir, filename));
  return readFileAsync(path, 'utf8')
    .then(safeLoad)
    .catch(err => {
      // js-yaml YAMLException message isnt helplful so do this
      if (err instanceof YAMLException) {
        throw new Error(`YAMLException: ${err.message}`);
      }
      throw err;
    });
}
