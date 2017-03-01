/*
  A Link is the bare minimum pointer to a CAPI object

  For example

  {
   "id": "http://www.ft.com/things/0ddeb68e-b81f-11e6-ba85-95d1533d9a62",
   "apiUrl": "http://api.ft.com/content/0ddeb68e-b81f-11e6-ba85-95d1533d9a62"
  },

*/
export class Link {
  constructor(id) {
    this.id = `http://api.ft.com/things/${id}`;
    this.apiUrl = `http://api.ft.com/content/${id}`;
    Object.defineProperty(this, 'uuid', {value: id, enumerable: false});
  }
}

export class Content {
  constructor(id) {
    Object.defineProperty(this, 'uuid', {value: id, enumerable: false});
    Object.defineProperty(this, 'filename', {value: `${id}.json`, enumerable: false});
    this.id = `http://www.ft.com/thing/${id}`;
    this.apiUrl = `http://api.ft.com/enrichedcontent/${id}`

    Object.defineProperty(this, 'overriddenProperties', {
      enumerable: true,
      get: () => {
        const keys = Object.keys(this).reduce((o, k) => {
          o[k] = true;
          return o;
        }, {});
        delete keys.id;
        delete keys.apiUrl;
        delete keys.overriddenProperties;
        return keys;
      }
    });
  }
  addPackage(pkg) {
    if (!pkg && this.containedIn && this.containedIn.length) {
      delete this.containedIn;
      return;
    }

    if (!pkg) return;

    if (!Array.isArray(this.containedIn)) {
      this.containedIn = [];
    }
    // We don't data for each piece of content in
    // the Package content, only a Link to the content
    this.containedIn.push(pkg.getLink());
  }
  getLink() {
    return new Link(this.uuid);
  }
}

export class Package extends Content {
  types = ['http://www.ft.com/ontology/content/ContentPackage'];
  constructor(id, { description = '', contains = []}) {
    super(id);
    this.addDescription(description);
    if (Array.isArray(contains)) {
      contains.forEach(item => this.addContent(item));
    }
  }
  addDescription(value) {
    if (!value && this.description) {
      delete this.description;
      delete this.descriptionXML;
    } else if (value) {
      this.description = value;
      this.descriptionXML = value;
    }
  }
  addContent(content) {
    if (!this.contains) this.contains = [];
    this.contains.push(content.getLink());
    content.addPackage(this);
  }

  // debugging utility to print contents
  dumpContents() {
    const ids = this.contains.map(c => c.uuid);
    console.log(`\nPackage contains ${ids.length} items:\n${ids.join('\n')}`);
  }
}

export class Article extends Content {}
export class Placeholder extends Content {}

// TODO: what to do about these types??
export class Video extends Content {
  types = ['http://www.ft.com/ontology/content/Video']
}

export class Podcast extends Content {
  types = ['http://www.ft.com/ontology/content/Podcast']
}
