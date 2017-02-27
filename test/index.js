import test from 'ava';
import { buildPackages } from '../lib/builder';
import Store from '../lib/store';
import writer from '../lib/writer';

const dataFixtureDirectory = 'test/fixtures/data';

// test(t => {
//   const store = new Store();
//   buildPackages(store, dataFixtureDirectory);
//   t.is(store.content.size, 2, 'Has correct number of packages');
//   console.log(JSON.stringify(data));
// });

test(async t => {
  const store = new Store();
  buildPackages(store, dataFixtureDirectory);
  await writer(store, 'tmp');
});

// Schema that describes what a landing page must look like
// Schema that describes what an article must look like

// test each schema
// test each items from buildPackagesData validates against the schema
