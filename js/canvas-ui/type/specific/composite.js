import { ElementType, ElementLifecycle } from "../generic/element.js";

export class CompositeType extends ElementType {
  _getLifecycle() {
    return new CompositeLifecycle();
  }
}

class CompositeLifecycle extends ElementLifecycle {
  _setFunctions() {
    super._setFunctions();
    this._lifecycle.set("getElement", () => {});
    this._lifecycle.set("updateElement", () => {});
  }
}
