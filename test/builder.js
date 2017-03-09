import test from 'ava';
// import Builder from '../lib/builder';

// const dataFixtureDirectory = 'test/fixtures/data';

test(async t => {
  // const builder = new Builder();
  // builder.addPackage(
  //   'aec5898e-b88c-11e6-ba85-95d1533d9a62',
  //   'A <strong>nice</strong> description',
  //   [
  //     {id: 'febac644-bc05-11e6-8b45-b8b81dd5d080'},
  //     {id: 'febac644-bc05-11e6-8b45-b8b81dd5d080'}
  //   ]
  // );
  t.true(true);
});


// xport default class Builder {
//   constructor() {
//     this.content = new Map();
//   }
//   addContent({ id }) {
//     if (!this.content.has(id)) {
//       const content = new Content(id);
//       this.content.set(id, content);
//     }
//     return this.content.get(id);
//   }
//   addPackage({ id, description, contains = []}) {
//     if (!this.content.has(id)) {
//       const pkg = new Package(id, {
//         description,
//         contains: contains.map(this.addContent, this)
//       });
//       this.content.set(id, pkg);
//     }
//     return this.content.get(id);
//   }
