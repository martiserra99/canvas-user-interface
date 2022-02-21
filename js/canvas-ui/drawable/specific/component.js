import { Drawable } from "../generic/drawable.js";

export class Component extends Drawable {
  constructor(id, type) {
    super(id, "component", type);
    this._setDrawable();
  }

  _setDrawable() {
    this._drawable = this._lifecycle.get("onGetDrawable")();
  }

  onStartUpdate() {
    super.onStartUpdate();
    this._updateDrawable();
    this._drawable.onStartUpdate();
  }

  _updateDrawable() {
    this._lifecycle.get("onUpdateDrawable")();
  }

  onMeasure(maxSize) {
    super.onMeasure(maxSize);
    this._drawable.onMeasure(maxSize);
    this.size = this._drawable.size;
  }

  onLocate(coords) {
    super.onLocate(coords);
    this._drawable.onLocate(coords);
    this.coords = coords;
  }

  onDraw(ctx) {
    super.onDraw(ctx);
    this._drawable.onDraw(ctx);
  }

  onEndUpdate() {
    super.onEndUpdate();
    this._drawable.onEndUpdate();
  }

  find(id) {
    if (this._drawable.id === id) return this._drawable;
    return this._drawable.drawable === "layout"
      ? this._drawable.find(id)
      : null;
  }
}
