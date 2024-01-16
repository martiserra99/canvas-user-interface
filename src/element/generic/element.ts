import { clone, removeFromArray } from '../../utils';

import Inner from './dependencies/inner';
import Custom from './dependencies/custom';
import Events from './dependencies/events';
import Listeners from './dependencies/listeners';
import LayoutParams from './dependencies/layout-params';

import UI from '../../ui';

import Layout from '../../element/specific/layout';

import ElementType, { ElementLifecycle } from '../../type/generic/element';

import { Size, Coords, Signal } from '../../types';

class Element {
  id: string;
  size: Size;
  coords: Coords;
  inner: Inner;
  custom: Custom;
  events: Events;
  listeners: Listeners;
  uiParent?: UI;
  layoutParent?: Layout;

  private properties: Map<string, any>;
  private functions: Map<string, Function>;
  private layoutParameters?: LayoutParams;
  protected lifecycle: Map<string, Function>;

  get layoutParams(): LayoutParams {
    return this.layoutParameters!;
  }

  constructor(id: string, type: ElementType) {
    this.id = id;
    this.size = { width: 0, height: 0 };
    this.coords = { x: 0, y: 0 };
    this.properties = new Map();
    this.functions = new Map();
    this.lifecycle = new Map();
    this.setProperties(type.properties);
    this.setFunctions(type.functions);
    this.setLifecycle(type.lifecycle);
    this.inner = new Inner(this, type.inner);
    this.custom = new Custom(this);
    this.events = new Events(type.events);
    this.listeners = new Listeners(this.events);
    this.lifecycle.get('onCreate')!();
  }

  private setProperties(properties: Map<string, any>) {
    for (const [name, value] of properties)
      this.properties.set(name, clone(value));
  }

  private setFunctions(functions: Map<string, Function>) {
    for (const [name, value] of functions)
      this.functions.set(name, value.bind(this, this));
  }

  private setLifecycle(lifecycle: ElementLifecycle) {
    for (const [name, value] of lifecycle)
      this.lifecycle.set(name, value.bind(this, this));
  }

  set(name: string, value: any) {
    if (!this.properties.has(name)) return;
    this.properties.set(name, value);
  }

  get(name: string) {
    return this.properties.get(name);
  }

  fun(name: string, value: Function) {
    this.functions.set(name, value.bind(this, this));
  }

  call(name: string, ...params: any[]) {
    return this.functions.get(name)!(...params);
  }

  insertToUI(uiParent: UI) {
    this.removeFromUI();
    this.removeFromLayout();
    uiParent.element = this;
    this.uiParent = uiParent;
  }

  removeFromUI() {
    if (this.uiParent) this.uiParent.element = null;
    delete this.uiParent;
    this.resetPlacementData();
  }

  insertToLayout(layoutParent: Layout) {
    this.removeFromUI();
    this.removeFromLayout();
    layoutParent.children.push(this);
    this.layoutParent = layoutParent;
    this.layoutParameters = new LayoutParams(this);
  }

  removeFromLayout() {
    if (this.layoutParent) removeFromArray(this.layoutParent.children, this);
    delete this.layoutParent;
    delete this.layoutParameters;
    this.resetPlacementData();
  }

  private resetPlacementData() {
    this.size = { width: 0, height: 0 };
    this.coords = { x: 0, y: 0 };
  }

  start() {
    this.lifecycle.get('onStart')!();
  }

  measure(maxSize: { width: number; height: number }) {
    this.lifecycle.get('onMeasure')!(maxSize);
  }

  locate(coords: { x: number; y: number }) {
    this.lifecycle.get('onLocate')!(coords);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.lifecycle.get('onDraw')!(ctx);
  }

  end() {
    this.lifecycle.get('onEnd')!();
  }

  signal(signal: Signal) {
    for (const [_, { check, state, callbacks }] of this.events) {
      const { event, data } = check(this, signal, state);
      if (!event) continue;
      for (const callback of callbacks) callback(this, data);
    }
  }
}

export default Element;
