import { Element } from "../generic/element.js";

export class Composite extends Element {
  constructor(id, type) {
    super(id, "composite", type);
    this._element = this._lifecycle.get("getElement")();
  }

  start() {
    super.start();
    this._lifecycle.get("updateElement")(this._element);
    this._element.start();
  }

  measure(maxSize) {
    super.measure(maxSize);
    this._element.measure(maxSize);
    this.size = this._element.size;
  }

  locate(coords) {
    super.locate(coords);
    this._element.locate(coords);
    this.coords = coords;
  }

  draw(ctx) {
    super.draw(ctx);
    this._element.draw(ctx);
  }

  end() {
    super.end();
    this._element.end();
  }

  signal(signal) {
    super.signal(signal);
    this._element.signal(signal);
  }
}
