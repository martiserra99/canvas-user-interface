export class Inner {
  constructor() {
    this.properties = new Map();
    this.functions = new Map();
  }

  set(name, value) {
    this.properties.set(name, value);
  }

  get(name) {
    return this.properties.get(name);
  }

  fun(name, value) {
    this.functions.set(name, value);
  }

  call(name, ...params) {
    return this.functions.get(name)(...params);
  }
}
