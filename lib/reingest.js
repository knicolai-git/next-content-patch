import { map } from 'bluebird';
import request from 'request-promise';

/**
* ES-interface API request to reingest one content item
* @param {string} id - single content ID.
* @returns {Promise} Returns a promise that resolves on response.
*/
function reingestContent(id) {
  // TODO: test to see if this actually works
  return request({
    method: 'PUT',
    qs: {apiKey: process.env.ES_INTERFACE_KEY},
    url: 'https://next-es-interface/',
    json: true,
    body: {id}
  });
}

/**
* Tell ES-interface to reingest a list of content IDs.
* @param {Array} id - content items to reingest
* @returns {Promise} - resolves when all reingestion is complete.
*/
export default function(id) {
  const ids = Array.isArray(id) ? id : [id];
  return map(ids, id => reingestContent(id));
}
