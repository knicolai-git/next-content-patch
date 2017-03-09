import fs from 'fs';
import test from 'ava';
import bluebird from 'bluebird';
import tmp from 'temporary';

bluebird.promisifyAll(fs);

import {
  writeContentJSON,
  writeBuilder
} from '../lib/writer';

import Builder from '../lib/builder';

const DIR = `${__dirname}/.tmp`;

// test.before('Create temporary write target', () => {
//   try {
//     fs.mkdirSync(DIR);
//   } catch (err) {
//     if (err.code !== 'EEXIST') {
//       throw err;
//     }
//   }
// });
//
// test.after.always('Cleanup/delete temporary write target', () => {
//   fs.rmdirSync(DIR);
// });

// skipping due to AVA watch problem
test.skip('Write a basic JSON to disk', t => {
  const dir = new tmp.Dir();

  console.log(dir.path); // path.

  t.notThrows(() =>
    writeContentJSON({
      foo: 'bar',
      id: 'aec5898e-b88c-11e6-ba85-95d1533d9a62',
      filename: 'basic-test.json',
    }, { dir })
  );
  dir.rmdir();
});

test('Throw when attempting to write a JSON without a ID', t =>
  t.throws(
    () => writeContentJSON({foo: 'bar', filename: 'no-uuid.json'}, {dir: DIR})
  )
);

test('Throw when attempting to write a JSON without a filename', t =>
  t.throws(
    () => writeContentJSON({foo: 'bar', id: 'aec5898e-b88c-11e6-ba85-95d1533d9a62'}, {dir: DIR})
  )
);

test.skip('Write contents of builder to directory', async t => {
  const builder = new Builder();
  const a = 'aec5898e-b88c-11e6-ba85-95d1533d9a62';
  const b = '0447a2b4-b826-11e6-ba85-95d1533d9a62';
  builder.addContent(a, {foo: 'bar'});
  builder.addContent(b, {beep: 'bop'});
  await writeBuilder(builder, DIR);
  const savedFiles = await fs.readdirAsync(DIR, 'utf8');
  t.true([`${a}.json`, `${b}.json`].every(i => savedFiles.includes(i)));
});
