import { Content, Package } from './models';

/*
 A Builder is responsible for building a collection of Content objects
 ensuring IDs are unique and that each object has the correct type
 and properties.
*/
export default class Builder {
  constructor() {
    this.content = new Map();
  }
  addContent({ id }) {
    if (!this.content.has(id)) {
      const content = new Content(id);
      this.content.set(id, content);
    }
    return this.content.get(id);
  }
  addPackage({ id, description, contains = []}) {
    if (!this.content.has(id)) {
      const pkg = new Package(id, {
        description,
        contains: contains.map(this.addContent, this)
      });
      this.content.set(id, pkg);
    }
    return this.content.get(id);
  }
  toJSON() {
    return JSON.stringify([...this.content.values()], null, ' ');
  }

  // debugging utility to see the contents of some of all of a builder
  static dump(builder, ids) {

    const filter = Array.isArray(ids) && ids.length ? (c) => ids.includes(c.uuid) : () => true;

    builder.content.forEach(content => {
      if (!filter(content)) return;
      console.log('\n' + JSON.stringify(content, null, ' ') + '\n')
    });
  }
}
