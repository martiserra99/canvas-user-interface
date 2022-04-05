import { ElementType, ElementLifecycle } from "../generic/element.js";

export class ViewType extends ElementType {
  _getLifecycle() {
    return new ViewLifecycle();
  }
}

class ViewLifecycle extends ElementLifecycle {
  _setFunctions() {
    super._setFunctions();
    this._lifecycle.set("getSize", () => ({ width: 0, height: 0 }));
    this._lifecycle.set("drawItself", () => {});
  }
}
