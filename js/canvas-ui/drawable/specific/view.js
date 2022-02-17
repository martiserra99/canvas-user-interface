import { Drawable } from "../generic/drawable.js";

export class View extends Drawable {
  constructor(id, type) {
    super(id, "view", type);
  }

  onSetSize(maxSize) {
    super.onSetSize(maxSize);
    this._setSize(maxSize);
  }

  _setSize(maxSize) {
    this.size = this._lifecycle.get("onGetSize")(maxSize);
  }

  onSetCoords(coords) {
    super.onSetCoords(coords);
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
