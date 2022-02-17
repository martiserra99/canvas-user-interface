import { fromMapToIterator } from "../../utils/utils.js";

export class DrawableType {
  constructor(name) {
    this.name = name;
    this.properties = new Map();
    this.functions = new Map();
    this.lifecycle = this._getLifecycle();
  }

  _getLifecycle() {
    return new DrawableLifecycle();
  }

  set(name, value) {
    this.properties.set(name, value);
  }

  fun(name, value) {
    this.functions.set(name, value);
  }
}

export class DrawableLifecycle {
  constructor() {
    this._lifecycle = new Map();
    this._setFunctions();
  }

  _setFunctions() {
    this._lifecycle.set("onCreate", () => {});
    this._lifecycle.set("onStartUpdateUI", () => {});
    this._lifecycle.set("onSetSize", () => {});
    this._lifecycle.set("onSetCoords", () => {});
    this._lifecycle.set("onDraw", () => {});
    this._lifecycle.set("onEndUpdateUI", () => {});
  }

  [Symbol.iterator]() {
    return fromMapToIterator(this._lifecycle);
  }

  set(name, value) {
    if (!this._lifecycle.has(name)) return;
    this._lifecycle.set(name, value);
  }
}