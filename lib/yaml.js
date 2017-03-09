import { normalize } from 'path';
import { readFile } from 'fs';
import { safeLoad, YAMLException } from 'js-yaml';
import { promisify } from 'bluebird';

const readFileAsync = promisify(readFile);

/**
* Read a file and parse it as YAML
* @param {String} path
* @returns {Promise} - resolves when YAML file is read and parsed
*/
export default function(path) {
  return readFileAsync(normalize(path), 'utf8')
    .then(safeLoad)
    .catch(err => {
      // js-yaml YAMLException message isnt helplful so do this
      if (err instanceof YAMLException) {
        throw new Error(`YAMLException: ${err.message}`);
      }
      throw err;
    });
}
