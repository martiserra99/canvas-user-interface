import { ElementType, ElementLifecycle } from "../generic/element.js";

export class LayoutType extends ElementType {
  constructor(data) {
    super(data);
    this.childLayoutParams = new ChildLayoutParams();
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

class ChildLayoutParams {
  constructor() {
    this._childLayoutParams = new Map();
  }

  [Symbol.iterator]() {
    return this._childLayoutParams[Symbol.iterator]();
  }

  set(name, value) {
    this._childLayoutParams.set(name, value);
  }
}
