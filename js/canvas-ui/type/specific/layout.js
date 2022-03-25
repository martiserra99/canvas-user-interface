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
    this._lifecycle.set("onSortChildsToMeasure", (layout) => layout.childs);
    this._lifecycle.set("onGetChildMaxSize", () => ({ width: 0, height: 0 }));
    this._lifecycle.set("onGetSize", () => ({ width: 0, height: 0 }));
    this._lifecycle.set("onSortChildsToLocate", (layout) => layout.childs);
    this._lifecycle.set("onGetChildCoords", (layout, coords) => coords);
    this._lifecycle.set("onDrawItself", () => {});
    this._lifecycle.set("onSortChildsToDraw", (layout) => layout.childs);
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
