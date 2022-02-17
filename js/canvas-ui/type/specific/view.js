import { DrawableType, DrawableLifecycle } from "../generic/drawable.js";

export class ViewType extends DrawableType {
  _getLifecycle() {
    return new ViewLifecycle();
  }
}

class ViewLifecycle extends DrawableLifecycle {
  _setFunctions() {
    super._setFunctions();
    this._lifecycle.set("onGetSize", () => ({ width: 0, height: 0 }));
    this._lifecycle.set("onDrawItself", () => {});
  }
}
