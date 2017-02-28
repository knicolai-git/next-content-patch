import { map } from 'bluebird';
import request from 'request-promise';

function isUUID(value) {
  return /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/.test(value);
}
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
export default function(id) {
  const ids = Array.isArray(id) ? id : [id];
  return Promise.all([
    map(ids, id => reingestContent(id, 'eu')),
    map(ids, id => reingestContent(id, 'us')),
  ]);
}
