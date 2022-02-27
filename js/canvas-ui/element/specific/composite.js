import { Element } from "../generic/element.js";

export class Composite extends Element {
  constructor(id, type) {
    super(id, "composite", type);
    this.element = this._lifecycle.get("onGetElement")();
  }

  onStart() {
    super.onStart();
    this._lifecycle.get("onUpdateElement")();
    this.element.onStart();
  }

  onMeasure(maxSize) {
    super.onMeasure(maxSize);
    this.element.onMeasure(maxSize);
    this.size = this.element.size;
  }

  onLocate(coords) {
    super.onLocate(coords);
    this.element.onLocate(coords);
    this.coords = coords;
  }

  onDraw(ctx) {
    super.onDraw(ctx);
    this.element.onDraw(ctx);
  }

  onEnd() {
    super.onEnd();
    this.element.onEnd();
  }
}
