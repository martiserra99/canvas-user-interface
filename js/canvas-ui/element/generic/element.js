import { clone, removeFromArray } from "../../utils/utils.js";

import { Inner } from "./dependencies/inner.js";
import { Custom } from "./dependencies/custom.js";
import { Events } from "./dependencies/events.js";
import { Listeners } from "./dependencies/listeners.js";
import { LayoutParams } from "./dependencies/layout-params.js";

export class Element {
  constructor(id, element, type) {
    this.id = id;
    this.element = element;
    this.type = type.name;
    this.size = { width: 0, height: 0 };
    this.coords = { x: 0, y: 0 };
    this._properties = new Map();
    this._functions = new Map();
    this._lifecycle = new Map();
    this._setProperties(type.properties);
    this._setFunctions(type.functions);
    this._setLifecycle(type.lifecycle);
    this.inner = new Inner(this, type.inner);
    this.custom = new Custom(this);
    this.events = new Events(type.events);
    this.listeners = new Listeners(this.events);
    this._lifecycle.get("onCreate")();
  }

  _setProperties(properties) {
    for (const [name, value] of properties)
      this._properties.set(name, clone(value));
  }

  _setFunctions(functions) {
    for (const [name, value] of functions)
      this._functions.set(name, value.bind(this, this));
  }

  _setLifecycle(lifecycle) {
    for (const [name, value] of lifecycle)
      this._lifecycle.set(name, value.bind(this, this));
  }

  set(name, value) {
    if (!this._properties.has(name)) return;
    this._properties.set(name, value);
  }

  get(name) {
    return this._properties.get(name);
  }

  fun(name, value) {
    this._functions.set(name, value.bind(this, this));
  }

  call(name, ...params) {
    return this._functions.get(name)(...params);
  }

  insertToUI(uiParent) {
    this.removeFromUI();
    this.removeFromLayout();
    uiParent.element = this;
    this.uiParent = uiParent;
  }

  removeFromUI() {
    delete this.uiParent?.element;
    delete this.uiParent;
    this._resetPlacementData();
  }

  insertToLayout(layoutParent) {
    this.removeFromUI();
    this.removeFromLayout();
    layoutParent.children.push(this);
    this.layoutParent = layoutParent;
    this.layoutParams = new LayoutParams(this);
  }

  removeFromLayout() {
    if (this.layoutParent) removeFromArray(this.layoutParent.children, this);
    delete this.layoutParent;
    delete this.layoutParams;
    this._resetPlacementData();
  }

  _resetPlacementData() {
    this.size = { width: 0, height: 0 };
    this.coords = { x: 0, y: 0 };
  }

  start() {
    this._lifecycle.get("onStart")();
  }

  measure(maxSize) {
    this._lifecycle.get("onMeasure")(maxSize);
  }

  locate(coords) {
    this._lifecycle.get("onLocate")(coords);
  }

  draw(ctx) {
    this._lifecycle.get("onDraw")(ctx);
  }

  end() {
    this._lifecycle.get("onEnd")();
  }

  signal(signal) {
    for (const [_, { check, state, callbacks }] of this.events) {
      const { event, data } = check(this, signal, state);
      if (!event) continue;
      for (const callback of callbacks) callback(this, data);
    }
  }
}
