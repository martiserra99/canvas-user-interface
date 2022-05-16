import { clone } from "../../../utils/utils.js";

export class Inner {
  constructor(element, inner) {
    this._element = element;
    this._properties = new Map();
    this._functions = new Map();
    this._setProperties(inner.properties);
    this._setFunctions(inner.functions);
  }

  _setProperties(properties) {
    for (const [name, value] of properties)
      this._properties.set(name, clone(value));
  }

  _setFunctions(functions) {
    for (const [name, value] of functions)
      this._functions.set(name, value.bind(this._element, this._element));
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
