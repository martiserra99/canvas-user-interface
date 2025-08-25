/* eslint-disable @typescript-eslint/no-explicit-any */
import ElementType, { ElementLifecycle } from "../../type/generic/element";

import Layout from "../../element/specific/layout";

import { Coords } from "../../types";

class LayoutType extends ElementType {
  layoutParams: LayoutParams;

  constructor(name: string) {
    super(name);
    this.layoutParams = new LayoutParams();
  }

  protected getLifecycle() {
    return new LayoutLifecycle();
  }
}

class LayoutLifecycle extends ElementLifecycle {
  protected setFunctions() {
    super.setFunctions();

    const sortChildrenToMeasure = (layout: Layout) => layout.children;
    this.lifecycle.set("sortChildrenToMeasure", sortChildrenToMeasure);

    const getChildMaxSize = () => ({ width: 0, height: 0 });
    this.lifecycle.set("getChildMaxSize", getChildMaxSize);

    const getSize = () => ({ width: 0, height: 0 });
    this.lifecycle.set("getSize", getSize);

    const sortChildrenToLocate = (layout: Layout) => layout.children;
    this.lifecycle.set("sortChildrenToLocate", sortChildrenToLocate);

    const getChildCoords = (_: Layout, coords: Coords) => coords;
    this.lifecycle.set("getChildCoords", getChildCoords);

    const drawItself = () => {};
    this.lifecycle.set("drawItself", drawItself);

    const sortChildrenToDraw = (layout: Layout) => layout.children;
    this.lifecycle.set("sortChildrenToDraw", sortChildrenToDraw);
  }
}

class LayoutParams {
  private layoutParams: Map<string, any>;

  constructor() {
    this.layoutParams = new Map();
  }

  [Symbol.iterator]() {
    return this.layoutParams[Symbol.iterator]();
  }

  set(name: string, value: any) {
    this.layoutParams.set(name, value);
  }
}

export default LayoutType;
