import { Events } from "./dependencies/events.js";
import { Inner } from "./dependencies/inner.js";

export class ElementType {
  constructor(name) {
    this.name = name;
    this.properties = new Map();
    this.functions = new Map();
    this.lifecycle = this._getLifecycle();
    this.inner = new Inner();
    this.events = new Events();
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
    return this._lifecycle[Symbol.iterator]();
  }

  set(name, value) {
    if (!this._lifecycle.has(name)) return;
    this._lifecycle.set(name, value);
  }
}
