import { Element } from "../generic/element.js";

export class View extends Element {
  constructor(id, type) {
    super(id, "view", type);
  }

  measure(maxSize) {
    super.measure(maxSize);
    this._setSize(maxSize);
  }

  _setSize(maxSize) {
    this.size = this._lifecycle.get("getSize")(maxSize);
  }

  locate(coords) {
    super.locate(coords);
    this._setCoords(coords);
  }

  _setCoords(coords) {
    this.coords = coords;
  }

  draw(ctx) {
    super.draw(ctx);
    this._drawItself(ctx);
  }

  _drawItself(ctx) {
    this._lifecycle.get("drawItself")(ctx);
  }
}
