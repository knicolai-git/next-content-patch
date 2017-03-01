import { normalize, join } from 'path';
import { readFile } from 'fs';
import { safeLoad, YAMLException } from 'js-yaml';
import { promisify } from 'bluebird';

const readFileAsync = promisify(readFile);

/**
* Read a file and parse it as YAML
* @param {String} filename
* @param {Object} options - `{dir}`
* @returns {Promise} - resolves when YAML file is read and parsed
*/
export default function(filename, { dir = 'data'}) {
  const path = normalize(join(dir, filename));
  return readFileAsync(path, 'utf8')
    .then(safeLoad)
    .catch(err => {
      // js-yaml's YAMLException message isn't very helpful unless we do this
      if (err instanceof YAMLException) {
        throw new Error(`YAMLException: ${err.message}`);
      }
      throw err;
    });
}
