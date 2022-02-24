import { Element } from "../generic/element.js";

export class Composite extends Element {
  constructor(id, type) {
    super(id, "composite", type);
    this._setElement();
  }

  _setElement() {
    this._element = this._lifecycle.get("onGetElement")();
  }

  onStartUpdate() {
    super.onStartUpdate();
    this._updateElement();
    this._element.onStartUpdate();
  }

  _updateElement() {
    this._lifecycle.get("onUpdateElement")();
  }

  onMeasure(maxSize) {
    super.onMeasure(maxSize);
    this._element.onMeasure(maxSize);
    this.size = this._element.size;
  }

  onLocate(coords) {
    super.onLocate(coords);
    this._element.onLocate(coords);
    this.coords = coords;
  }

  onDraw(ctx) {
    super.onDraw(ctx);
    this._element.onDraw(ctx);
  }

  onEndUpdate() {
    super.onEndUpdate();
    this._element.onEndUpdate();
  }

  find(id) {
    if (this._element.id === id) return this._element;
    return this._element.element === "layout" ? this._element.find(id) : null;
  }
}
