import { map } from 'bluebird';
import request from 'request-promise';
import { isUUID, assertAllUUIDs } from './utils';

/**
* ES-interface API request to reingest one content item
* @param {string} id - single content ID.
* @param {string} region - ES Interface region name ('eu' or 'us').
* @returns {Promise} Returns a promise that resolves on response.
*/
function reingestContent(id, region) {
  if (!isUUID(id)) {
    return Promise.reject(new Error(`Invalid ID: ${id}`));
  }

  return request({
    method: 'PUT',
    body: { id },
    qs: {apiKey: process.env.ES_INTERFACE_API_KEY},
    url: `https://ft-next-es-interface-${region}.herokuapp.com/api/item`,
    json: true
  }).then(
    (res) => {console.log(`${id} in ${region} reindex done`); return true},
    (err) => {console.error(`${id} in ${region} reindex failed:`); return true}
  );
}

/**
* Tell ES-interface to reindex a list of content IDs in all regions.
* @param {Array} id - content items to reingest
* @returns {Promise} - resolves when all reingestion is complete.
*/
export default function(id, concurrency = Infinity) {
  const ids = Array.isArray(id) ? id : [id];

  try {
    assertAllUUIDs(ids)
  } catch(err) {
    return Promise.reject(err);
  }

  const eu = ids.map(_id => [_id, 'eu'])
  const us = ids.map(_id => [_id, 'us']);
  const jobs = eu.concat(us);

  return map(jobs, ([_id, region]) => reingestContent(_id, region), {concurrency});
}
