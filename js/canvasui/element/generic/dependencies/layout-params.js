import { clone } from "../../../utils/utils.js";

export class LayoutParams {
  constructor(element) {
    this._element = element;
    this._layoutParent = element.layoutParent;
    this._layoutParams = new Map();
    this._setLayoutParams();
  }

  _setLayoutParams() {
    for (const [name, value] of this._layoutParent.childLayoutParams)
      this._layoutParams.set(name, clone(value));
  }

  set(name, value) {
    if (!this._layoutParams.has(name)) return;
    this._layoutParams.set(name, value);
  }

  get(name) {
    return this._layoutParams.get(name);
  }
}
