import { DrawableType, DrawableLifecycle } from "../generic/drawable.js";

export class ComponentType extends DrawableType {
  _getLifecycle() {
    return new ComponentLifecycle();
  }
}

class ComponentLifecycle extends DrawableLifecycle {
  _setFunctions() {
    super._setFunctions();
    this._lifecycle.set("onGetDrawable", () => {});
    this._lifecycle.set("onUpdateDrawable", () => {});
  }
}
