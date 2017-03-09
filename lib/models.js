import { assertUUID } from './utils';

class PackageContents {
  constructor(uuid) {
    assertUUID(uuid);
    this.uuid = uuid;
    Object.defineProperty(this, 'source', {
      value: [],
      enumerable: false
    });
    Object.defineProperty(this, '_json_', {
      value: ['id', 'apiUrl', 'title'],
      enumerable: false
    });
  }

  push(content) {
    if (!content) return;
    if (!content.id) throw new Error('Content doesnt have an ID');

    const index = this.source.findIndex(element => element.id === content.id);

    if (index !== -1) {
      // TODO: merge?
      console.log('Already contained')
    } else {
      this.source.push(content);
    }
    if (!content.containedIn) {
      content.containedIn = [];
    }

    if (-1 !== content.containedIn.findIndex(element => element.id === `http://api.ft.com/things/${content.id}`)) {
      content.containedIn.push({
        id: `http://api.ft.com/things/${this.uuid}`,
        apiUrl: `http://api.ft.com/content/${this.uuid}`
      });
    }
  }

  toJSON() {
    return this.source.map(element =>
      this._json_.reduce((obj, prop) => {
        if (typeof element[prop] !== 'undefined') {
          obj[prop] = element[prop];
        }
        return obj;
      }, {})
    );
  }
}

export class Content {
  constructor(uuid, data = {}) {
    assertUUID(uuid);
    Object.defineProperty(this, '_json_', {value: [
      'id', 'apiUrl',
      'containedIn', 'topper',
      'leadImages'
    ], enumerable: false});
    this.uuid = uuid;
    this.filename = `${uuid}.json`;
    this.id = `http://www.ft.com/thing/${uuid}`;
    this.apiUrl = `http://api.ft.com/enrichedcontent/${uuid}`;
    Object.assign(this, data);
  }

  get overriddenProperties() {
    return this._json_.reduce((result, prop) => {
      const value = this[prop];
      if (typeof value !== 'undefined' && !Array.isArray(value)) {
        result.push(prop);
      }
      return result;
    }, []);
  }

  // debugging utility to print contents
  dumpContents() {
    if (!this.contains) return;
    const ids = this.contains.source.map(c => c.uuid);
    console.log(`\nPackage contains ${ids.length} items:\n${ids.join('\n')}`);
  }

  toJSON() {
    const overriddenProperties = this.overriddenProperties;
    if (!overriddenProperties.length) return

    const result = {};
    result.overriddenProperties = overriddenProperties;
    result.mockData = true;

    for (const prop of this._json_) {
      const value = this[prop];
      if (typeof value !== 'undefined' && !Array.isArray(value)) {
        result[prop] = value;
      }
    }
    return result;
  }
}

export class Package extends Content {
  types = ['http://www.ft.com/ontology/content/ContentPackage'];

  constructor(id, data) {
    super(id, data);
    this.contains = new PackageContents(id);
    if (data.contains) {
      data.contains.forEach(item => this.contains.push(item));
    }
    Array.prototype.push.apply(this._json_, [
      'types', 'description', 'contains',
      'tableOfContents', 'design',
    ]);
  }
}
