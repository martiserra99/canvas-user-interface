export class Custom {
  constructor(element) {
    this._element = element;
    this._properties = new Map();
    this._functions = new Map();
  }

  set(name, value) {
    this._properties.set(name, value);
  }

  get(name) {
    return this._properties.get(name);
  }

  fun(name, value) {
    this._functions.set(name, value.bind(this._element, this._element));
  }

  call(name, ...params) {
    return this._functions.get(name)(...params);
  }
}
