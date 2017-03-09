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
  addContent(id, data) {
    if (!this.content.has(id)) {
      const content = new Content(id, data);
      this.content.set(id, content);
    }
    return this.content.get(id);
  }
  addPackage(id, data) {
    if (!this.content.has(id)) {
      const pkg = new Package(id, {
        ...data,
        contains: !data.contains ? [] : data.contains.map(
          item => this.addContent(item.id, item)
        )
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
