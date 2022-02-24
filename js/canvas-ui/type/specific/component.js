import { ElementType, ElementLifecycle } from "../generic/element.js";

export class ComponentType extends ElementType {
  _getLifecycle() {
    return new ComponentLifecycle();
  }
}

class ComponentLifecycle extends ElementLifecycle {
  _setFunctions() {
    super._setFunctions();
    this._lifecycle.set("onGetElement", () => {});
    this._lifecycle.set("onUpdateElement", () => {});
  }
}
