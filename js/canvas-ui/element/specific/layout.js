import { Element } from "../generic/element.js";

export class Layout extends Element {
  constructor(id, type) {
    super(id, "layout", type);
    this.childs = [];
    this.childLayoutParams = new Map();
    this._setChildLayoutParams(type);
  }

  _setChildLayoutParams(type) {
    for (const [key, value] of type.childLayoutParams)
      this.childLayoutParams.set(key, value);
  }

  onStart() {
    super.onStart();
    for (const child of this.childs) child.onStart();
  }

  onMeasure(maxSize) {
    super.onMeasure(maxSize);
    this._setChildsSizes(maxSize);
    this._setSize(maxSize);
  }

  _setChildsSizes(maxSize) {
    const childs = this._sortChildsToMeasures(maxSize);
    const childsWithSizes = [];
    for (const child of childs) {
      const childMaxSize = this._getChildMaxSize(
        maxSize,
        child,
        childsWithSizes
      );
      child.onMeasure(childMaxSize);
      childsWithSizes.push(child);
    }
  }

  _sortChildsToMeasures(maxSize) {
    return this._lifecycle.get("onSortChildsToMeasure")(maxSize);
  }

  _getChildMaxSize(maxSize, child, childsWithSizes) {
    return this._lifecycle.get("onGetChildMaxSize")(
      maxSize,
      child,
      childsWithSizes
    );
  }

  _setSize(maxSize) {
    this.size = this._lifecycle.get("onGetSize")(maxSize);
  }

  onLocate(coords) {
    super.onLocate(coords);
    this._setChildsCoords(coords);
    this._setCoords(coords);
  }

  _setChildsCoords(coords) {
    const childs = this._sortChildsToLocate(coords);
    const childsWithCoords = [];
    for (const child of childs) {
      const childCoords = this._getChildCoords(coords, child, childsWithCoords);
      child.onLocate(childCoords);
      childsWithCoords.push(child);
    }
  }

  _sortChildsToLocate(coords) {
    return this._lifecycle.get("onSortChildsToLocate")(coords);
  }

  _getChildCoords(coords, child, childsWithCoords) {
    return this._lifecycle.get("onGetChildCoords")(
      coords,
      child,
      childsWithCoords
    );
  }

  _setCoords(coords) {
    this.coords = coords;
  }

  onDraw(ctx) {
    super.onDraw(ctx);
    this._drawItself(ctx);
    this._drawChilds(ctx);
  }

  _drawItself(ctx) {
    this._lifecycle.get("onDrawItself")(ctx);
  }

  _drawChilds(ctx) {
    const childs = this._sortChildsToDraw(ctx);
    for (const child of childs) child.onDraw(ctx);
  }

  _sortChildsToDraw(ctx) {
    return this._lifecycle.get("onSortChildsToDraw")(ctx);
  }

  onEnd() {
    super.onEnd();
    for (const child of this.childs) child.onEnd();
  }

  insert(child) {
    child.insertToLayout(this);
  }

  remove(child) {
    if (!this.childs.includes(child)) return;
    child.removeFromLayout();
  }

  find(id, direct = false) {
    const childs = [...this.childs];
    while (childs.length > 0) {
      const child = childs.shift();
      if (child.id === id) return child;
      if (child.element === "layout" && !direct) childs.push(...child.childs);
    }
    return null;
  }
}
