/* eslint-disable @typescript-eslint/no-explicit-any */
import Element from "../generic/element";

import LayoutType from "../../type/specific/layout";

import { Size, Coords, Signal } from "../../types";

class Layout extends Element {
  children: Element[];
  childLayoutParams: Map<string, any>;

  constructor(id: string, type: LayoutType) {
    super(id, type);
    this.children = [];
    this.childLayoutParams = new Map();
    this.setChildLayoutParams(type);
  }

  private setChildLayoutParams(type: LayoutType) {
    for (const [key, value] of type.layoutParams)
      this.childLayoutParams.set(key, value);
  }

  start() {
    super.start();
    for (const child of this.children) child.start();
  }

  measure(maxSize: Size) {
    super.measure(maxSize);
    this.setChildrenSizes(maxSize);
    this.setSize(maxSize);
  }

  private setChildrenSizes(maxSize: Size) {
    const children = this.sortChildrenToMeasure(maxSize);
    const childrenWithSizes = [];
    for (const child of children) {
      const childMaxSize = this.getChildMaxSize(
        maxSize,
        child,
        childrenWithSizes
      );
      child.measure(childMaxSize);
      childrenWithSizes.push(child);
    }
  }

  private sortChildrenToMeasure(maxSize: Size) {
    return this.lifecycle.get("sortChildrenToMeasure")!(maxSize);
  }

  private getChildMaxSize(
    maxSize: Size,
    child: Element,
    childrenWithSizes: Element[]
  ) {
    return this.lifecycle.get("getChildMaxSize")!(
      maxSize,
      child,
      childrenWithSizes
    );
  }

  private setSize(maxSize: Size) {
    this.size = this.lifecycle.get("getSize")!(maxSize);
  }

  locate(coords: Coords) {
    super.locate(coords);
    this.setChildrenCoords(coords);
    this.setCoords(coords);
  }

  private setChildrenCoords(coords: Coords) {
    const children = this.sortChildrenToLocate(coords);
    const childrenWithCoords = [];
    for (const child of children) {
      const childCoords = this.getChildCoords(
        coords,
        child,
        childrenWithCoords
      );
      child.locate(childCoords);
      childrenWithCoords.push(child);
    }
  }

  private sortChildrenToLocate(coords: Coords) {
    return this.lifecycle.get("sortChildrenToLocate")!(coords);
  }

  private getChildCoords(
    coords: Coords,
    child: Element,
    childrenWithCoords: Element[]
  ) {
    return this.lifecycle.get("getChildCoords")!(
      coords,
      child,
      childrenWithCoords
    );
  }

  private setCoords(coords: Coords) {
    this.coords = coords;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    this.drawItself(ctx);
    this.drawChildren(ctx);
  }

  private drawItself(ctx: CanvasRenderingContext2D) {
    this.lifecycle.get("drawItself")!(ctx);
  }

  private drawChildren(ctx: CanvasRenderingContext2D) {
    const children = this.sortChildrenToDraw(ctx);
    for (const child of children) child.draw(ctx);
  }

  private sortChildrenToDraw(ctx: CanvasRenderingContext2D) {
    return this.lifecycle.get("sortChildrenToDraw")!(ctx);
  }

  end() {
    super.end();
    for (const child of this.children) child.end();
  }

  signal(signal: Signal) {
    super.signal(signal);
    for (const child of this.children) child.signal(signal);
  }

  insert(child: Element) {
    child.insertToLayout(this);
  }

  remove(child: Element) {
    if (!this.children.includes(child)) return;
    child.removeFromLayout();
  }

  removeAll() {
    for (const child of [...this.children]) child.removeFromLayout();
  }

  find(id: string, direct = false) {
    const children = [...this.children];
    while (children.length > 0) {
      const child = children.shift()!;
      if (child.id === id) return child;
      if (child instanceof Layout && !direct) children.push(...child.children);
    }
    return null;
  }
}

export default Layout;
