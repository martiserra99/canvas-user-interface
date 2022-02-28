import { Element } from "../generic/element.js";

export class Composite extends Element {
  constructor(id, type) {
    super(id, "composite", type);
    this._element = this._lifecycle.get("onGetElement")();
  }

  onStart() {
    super.onStart();
    this._lifecycle.get("onUpdateElement")(this._element);
    this._element.onStart();
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

  onEnd() {
    super.onEnd();
    this._element.onEnd();
  }

  signal(signal) {
    super.signal(signal);
    if (signal.propagate) this._element.signal(signal);
  }
}
