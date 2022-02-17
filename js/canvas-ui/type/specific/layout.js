import { DrawableType, DrawableLifecycle } from "../generic/drawable.js";
import { fromMapToIterator } from "../../utils/utils.js";

export class LayoutType extends DrawableType {
  constructor(data) {
    super(data);
    this.childLayoutParams = new ChildLayoutParams();
  }

  _getLifecycle() {
    return new LayoutLifecycle();
  }
}

class LayoutLifecycle extends DrawableLifecycle {
  _setFunctions() {
    super._setFunctions();
    this._lifecycle.set("onSortChildsToSetSizes", (layout) => layout.childs);
    this._lifecycle.set("onGetChildMaxSize", () => ({ width: 0, height: 0 }));
    this._lifecycle.set("onGetSize", () => ({ width: 0, height: 0 }));
    this._lifecycle.set("onSortChildsToSetCoords", (layout) => layout.childs);
    this._lifecycle.set("onGetChildCoords", (layout, inner, coords) => coords);
    this._lifecycle.set("onSortChildsToDraw", (layout) => layout.childs);
    this._lifecycle.set("onDrawItself", () => {});
  }
}

class ChildLayoutParams {
  constructor() {
    this._childLayoutParams = new Map();
  }

  [Symbol.iterator]() {
    return fromMapToIterator(this._childLayoutParams);
  }

  set(name, value) {
    this._childLayoutParams.set(name, value);
  }
}
