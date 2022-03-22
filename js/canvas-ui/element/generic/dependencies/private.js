import { clone } from "../../../utils/utils.js";

export class Private {
  constructor(element, private) {
    this._element = element;
    this._properties = new Map();
    this._functions = new Map();
    this._setProperties(private.properties);
    this._setFunctions(private.functions);
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
