import { Element } from "../generic/element.js";

export class View extends Element {
  constructor(id, type) {
    super(id, "view", type);
  }

  onMeasure(maxSize) {
    super.onMeasure(maxSize);
    this._setSize(maxSize);
  }

  _setSize(maxSize) {
    this.size = this._lifecycle.get("onGetSize")(maxSize);
  }

  onLocate(coords) {
    super.onLocate(coords);
    this._setCoords(coords);
  }

  _setCoords(coords) {
    this.coords = coords;
  }

  onDraw(ctx) {
    super.onDraw(ctx);
    this._drawItself(ctx);
  }

  _drawItself(ctx) {
    this._lifecycle.get("onDrawItself")(ctx);
  }
}