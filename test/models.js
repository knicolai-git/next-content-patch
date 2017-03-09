import test from 'ava';
import { Content, Package } from '../lib/models';

test(async t => {
  const uuid = 'aec5898e-b88c-11e6-ba85-95d1533d9a62';
  const content = new Content(uuid);
  t.is(content.uuid, uuid);
  t.is(content.id, `http://www.ft.com/thing/${uuid}`);
  t.is(content.apiUrl, `http://api.ft.com/enrichedcontent/${uuid}`);
  t.is(content.filename, `${uuid}.json`);
  const expectedJSON = {
    id: `http://www.ft.com/thing/${uuid}`,
    apiUrl: `http://api.ft.com/enrichedcontent/${uuid}`,
    mockData: true,
    overriddenProperties: [
      'id',
      'apiUrl'
    ]
  }
  t.deepEqual(content.toJSON(), expectedJSON);
});

test.skip(async t => {
  t.throws(() => {
    const content = new Content('invaliduuid');
  });
});
