import { Element } from "../generic/element.js";

export class Layout extends Element {
  constructor(id, type) {
    super(id, "layout", type);
    this.children = [];
    this.childLayoutParams = new Map();
    this._setChildLayoutParams(type);
  }

  _setChildLayoutParams(type) {
    for (const [key, value] of type.layoutParams)
      this.childLayoutParams.set(key, value);
  }

  start() {
    super.start();
    for (const child of this.children) child.start();
  }

  measure(maxSize) {
    super.measure(maxSize);
    this._setchildrenSizes(maxSize);
    this._setSize(maxSize);
  }

  _setchildrenSizes(maxSize) {
    const children = this._sortchildrenToMeasure(maxSize);
    const childrenWithSizes = [];
    for (const child of children) {
      const childMaxSize = this._getChildMaxSize(
        maxSize,
        child,
        childrenWithSizes
      );
      child.measure(childMaxSize);
      childrenWithSizes.push(child);
    }
  }

  _sortchildrenToMeasure(maxSize) {
    return this._lifecycle.get("sortchildrenToMeasure")(maxSize);
  }

  _getChildMaxSize(maxSize, child, childrenWithSizes) {
    return this._lifecycle.get("getChildMaxSize")(
      maxSize,
      child,
      childrenWithSizes
    );
  }

  _setSize(maxSize) {
    this.size = this._lifecycle.get("getSize")(maxSize);
  }

  locate(coords) {
    super.locate(coords);
    this._setchildrenCoords(coords);
    this._setCoords(coords);
  }

  _setchildrenCoords(coords) {
    const children = this._sortchildrenToLocate(coords);
    const childrenWithCoords = [];
    for (const child of children) {
      const childCoords = this._getChildCoords(
        coords,
        child,
        childrenWithCoords
      );
      child.locate(childCoords);
      childrenWithCoords.push(child);
    }
  }

  _sortchildrenToLocate(coords) {
    return this._lifecycle.get("sortchildrenToLocate")(coords);
  }

  _getChildCoords(coords, child, childrenWithCoords) {
    return this._lifecycle.get("getChildCoords")(
      coords,
      child,
      childrenWithCoords
    );
  }

  _setCoords(coords) {
    this.coords = coords;
  }

  draw(ctx) {
    super.draw(ctx);
    this._drawItself(ctx);
    this._drawchildren(ctx);
  }

  _drawItself(ctx) {
    this._lifecycle.get("drawItself")(ctx);
  }

  _drawchildren(ctx) {
    const children = this._sortchildrenToDraw(ctx);
    for (const child of children) child.draw(ctx);
  }

  _sortchildrenToDraw(ctx) {
    return this._lifecycle.get("sortchildrenToDraw")(ctx);
  }

  end() {
    super.end();
    for (const child of this.children) child.end();
  }

  signal(signal) {
    super.signal(signal);
    for (const child of this.children) child.signal(signal);
  }

  insert(child) {
    child.insertToLayout(this);
  }

  remove(child) {
    if (!this.children.includes(child)) return;
    child.removeFromLayout();
  }

  find(id, direct = false) {
    const children = [...this.children];
    while (children.length > 0) {
      const child = children.shift();
      if (child.id === id) return child;
      if (child.element === "layout" && !direct)
        children.push(...child.children);
    }
    return null;
  }
}
