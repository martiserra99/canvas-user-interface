import { Drawable } from "../generic/drawable.js";

export class Component extends Drawable {
  constructor(id, type) {
    super(id, "component", type);
    this._setDrawable();
  }

  _setDrawable() {
    this._drawable = this._lifecycle.get("onGetDrawable")();
  }

  onStartUpdateUI() {
    super.onStartUpdateUI();
    this._updateDrawable();
    this._drawable.onStartUpdateUI();
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

  onEndUpdateUI() {
    super.onEndUpdateUI();
    this._drawable.onEndUpdateUI();
  }
}
