import { fromMapToIterator } from "../../utils/utils.js";

export class ElementType {
  constructor(name) {
    this.name = name;
    this.properties = new Map();
    this.functions = new Map();
    this.lifecycle = this._getLifecycle();
  }

  _getLifecycle() {
    return new ElementLifecycle();
  }

  set(name, value) {
    this.properties.set(name, value);
  }

  fun(name, value) {
    this.functions.set(name, value);
  }
}

export class ElementLifecycle {
  constructor() {
    this._lifecycle = new Map();
    this._setFunctions();
  }

  _setFunctions() {
    this._lifecycle.set("onCreate", () => {});
    this._lifecycle.set("onStart", () => {});
    this._lifecycle.set("onMeasure", () => {});
    this._lifecycle.set("onLocate", () => {});
    this._lifecycle.set("onDraw", () => {});
    this._lifecycle.set("onEnd", () => {});
  }

  [Symbol.iterator]() {
    return fromMapToIterator(this._lifecycle);
  }

  set(name, value) {
    if (!this._lifecycle.has(name)) return;
    this._lifecycle.set(name, value);
  }
}
