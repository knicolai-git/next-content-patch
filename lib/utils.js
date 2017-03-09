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
* Throw error is value not a valid UUID
* @param {String} value
*/
export function assertUUID(value) {
  if (!isUUID(value)) {
    throw new Error(`Invalid ID: ${value}`);
  }
}

/**
* Find invalid UUIDs in an array off UUIDs
* @param {Array} ids
* @returns {Array}
*/
export function invalidUUIDs(ids) {
  if (!ids) return [];
  return ids.filter(id => !isUUID(id));
}

/**
* Find invalid UUIDs in an array off UUIDs and throw
* @param {Array} ids
*/
export function assertAllUUIDs(ids) {
  const badIds = invalidUUIDs(ids);
  if (badIds.length) {
    const err = new Error(`Invalid IDs:\n\t${badIds.join('\n\t')}`);
    err.ids = badIds;
    throw err;
  }
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
      console.error('');
      process.exit(1);
    }
  }
}
