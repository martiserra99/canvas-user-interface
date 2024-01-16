import Events from './dependencies/events';
import Inner from './dependencies/inner';

class ElementType {
  name: string;
  properties: Map<string, any>;
  functions: Map<string, Function>;
  lifecycle: ElementLifecycle;
  inner: Inner;
  events: Events;

  constructor(name: string) {
    this.name = name;
    this.properties = new Map();
    this.functions = new Map();
    this.lifecycle = this.getLifecycle();
    this.inner = new Inner();
    this.events = new Events();
  }

  protected getLifecycle() {
    return new ElementLifecycle();
  }

  set(name: string, value: any) {
    this.properties.set(name, value);
  }

  fun(name: string, value: Function) {
    this.functions.set(name, value);
  }
}

export class ElementLifecycle {
  protected lifecycle: Map<string, Function>;

  constructor() {
    this.lifecycle = new Map();
    this.setFunctions();
  }

  protected setFunctions() {
    this.lifecycle.set('onCreate', () => {});
    this.lifecycle.set('onStart', () => {});
    this.lifecycle.set('onMeasure', () => {});
    this.lifecycle.set('onLocate', () => {});
    this.lifecycle.set('onDraw', () => {});
    this.lifecycle.set('onEnd', () => {});
  }

  [Symbol.iterator]() {
    return this.lifecycle[Symbol.iterator]();
  }

  set(name: string, value: Function) {
    if (!this.lifecycle.has(name)) return;
    this.lifecycle.set(name, value);
  }
}

export default ElementType;
