/**
* Tests a value is a plain object
* @param {Object} value
* @returns {Boolean}
*/
export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
* Tests a value is a valid UUID
* @param {String} value
* @returns {Boolean}
*/
export function isUUID(value) {
  return /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value);
}

/**
* Function wrapper to call `process.exit(1)` when `fn` throws an exception.
* @param {Function} fn - Function (or AsyncFunction) to wrap.
* @returns {AsyncFunction}
*/
export function task(fn) {
  return async function() {
    try {
      await fn();
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  }
}
