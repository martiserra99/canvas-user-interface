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
    this._setChildrenSizes(maxSize);
    this._setSize(maxSize);
  }

  _setChildrenSizes(maxSize) {
    const children = this._sortChildrenToMeasure(maxSize);
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

  _sortChildrenToMeasure(maxSize) {
    return this._lifecycle.get("sortChildrenToMeasure")(maxSize);
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
    this._setChildrenCoords(coords);
    this._setCoords(coords);
  }

  _setChildrenCoords(coords) {
    const children = this._sortChildrenToLocate(coords);
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

  _sortChildrenToLocate(coords) {
    return this._lifecycle.get("sortChildrenToLocate")(coords);
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
    this._drawChildren(ctx);
  }

  _drawItself(ctx) {
    this._lifecycle.get("drawItself")(ctx);
  }

  _drawChildren(ctx) {
    const children = this._sortChildrenToDraw(ctx);
    for (const child of children) child.draw(ctx);
  }

  _sortChildrenToDraw(ctx) {
    return this._lifecycle.get("sortChildrenToDraw")(ctx);
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

  removeAll() {
    for (const child of [...this.children]) child.removeFromLayout();
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
