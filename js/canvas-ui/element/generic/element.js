import { clone, removeFromArray } from "../../utils/utils.js";

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
    this._inner = new Map();
    this._setProperties(type);
    this._setFunctions(type);
    this._setLifecycle(type);
    this.custom = new Custom(this);
    this.events = new Events(type.events);
    this.listeners = new Listeners(this.events);
    this._lifecycle.get("onCreate")();
  }

  _setProperties(type) {
    for (const [name, value] of type.properties)
      this._properties.set(name, clone(value));
  }

  _setFunctions(type) {
    for (const [name, value] of type.functions)
      this._functions.set(name, value.bind(this, this, this._inner));
  }

  _setLifecycle(type) {
    for (const [name, value] of type.lifecycle)
      this._lifecycle.set(name, value.bind(this, this, this._inner));
  }

  set(name, value) {
    if (!this._properties.has(name)) return;
    this._properties.set(name, value);
  }

  get(name) {
    return this._properties.get(name);
  }

  fun(name, value) {
    this._functions.set(name, value.bind(this, this, this._inner));
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
    layoutParent.childs.push(this);
    this.layoutParent = layoutParent;
    this.layoutParams = new LayoutParams(this);
  }

  removeFromLayout() {
    if (this.layoutParent) removeFromArray(this.layoutParent.childs, this);
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
    for (const [_, { onCheck, state, callbacks }] of this.events) {
      const { check, data } = onCheck(this, signal, state);
      if (!check) continue;
      for (const callback of callbacks) callback(this, data);
    }
  }
}

class Custom {
  constructor(element) {
    this._element = element;
    this._properties = new Map();
    this._functions = new Map();
  }

  set(name, value) {
    this._properties.set(name, value);
  }

  get(name) {
    return this._properties.get(name);
  }

  fun(name, value) {
    this._functions.set(name, value.bind(this._element, this._element));
  }

  call(name, ...params) {
    return this._functions.get(name)(...params);
  }
}

class Events {
  constructor(events) {
    this._events = new Map();
    this._setEvents(events);
  }

  _setEvents(events) {
    for (const [name, { onCheck, callbacks }] of events)
      this._events.set(name, {
        onCheck,
        state: new Map(),
        callbacks: [...callbacks],
      });
  }

  [Symbol.iterator]() {
    return this._events[Symbol.iterator]();
  }

  get(name) {
    return this._events.get(name);
  }
}

class Listeners {
  constructor(events) {
    this._events = events;
  }

  add(name, value) {
    this._events.get(name).callbacks.push(value);
  }

  remove(name, callback) {
    return removeFromArray(this._events.get(name).callbacks, callback);
  }
}

class LayoutParams {
  constructor(element) {
    this._element = element;
    this._layoutParent = element.layoutParent;
    this._layoutParams = new Map();
    this._setLayoutParams();
  }

  _setLayoutParams() {
    for (const [name, value] of this._layoutParent.childLayoutParams)
      this._layoutParams.set(name, clone(value));
  }

  set(name, value) {
    if (!this._layoutParams.has(name)) return;
    this._layoutParams.set(name, value);
  }

  get(name) {
    return this._layoutParams.get(name);
  }
}
