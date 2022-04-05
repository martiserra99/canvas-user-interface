import { ElementType, ElementLifecycle } from "../generic/element.js";

export class LayoutType extends ElementType {
  constructor(data) {
    super(data);
    this.layoutParams = new LayoutParams();
  }

  _getLifecycle() {
    return new LayoutLifecycle();
  }
}

class LayoutLifecycle extends ElementLifecycle {
  _setFunctions() {
    super._setFunctions();
    this._lifecycle.set("sortchildrenToMeasure", (layout) => layout.children);
    this._lifecycle.set("getChildMaxSize", () => ({ width: 0, height: 0 }));
    this._lifecycle.set("getSize", () => ({ width: 0, height: 0 }));
    this._lifecycle.set("sortchildrenToLocate", (layout) => layout.children);
    this._lifecycle.set("getChildCoords", (layout, coords) => coords);
    this._lifecycle.set("drawItself", () => {});
    this._lifecycle.set("sortchildrenToDraw", (layout) => layout.children);
  }
}

class LayoutParams {
  constructor() {
    this._layoutParams = new Map();
  }

  [Symbol.iterator]() {
    return this._layoutParams[Symbol.iterator]();
  }

  set(name, value) {
    this._layoutParams.set(name, value);
  }
}
