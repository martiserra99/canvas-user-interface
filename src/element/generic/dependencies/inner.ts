import Element from '../element';

import { clone } from '../../../utils';

type InnerValues = {
  properties: Map<string, any>;
  functions: Map<string, Function>;
};

class Inner {
  private element: Element;
  private properties: Map<string, any>;
  private functions: Map<string, Function>;

  constructor(element: Element, inner: InnerValues) {
    this.element = element;
    this.properties = new Map();
    this.functions = new Map();
    this.setProperties(inner.properties);
    this.setFunctions(inner.functions);
  }

  private setProperties(properties: Map<string, any>) {
    for (const [name, value] of properties)
      this.properties.set(name, clone(value));
  }

  private setFunctions(functions: Map<string, Function>) {
    for (const [name, value] of functions)
      this.functions.set(name, value.bind(this.element, this.element));
  }

  set(name: string, value: any) {
    this.properties.set(name, value);
  }

  get(name: string) {
    return this.properties.get(name);
  }

  fun(name: string, value: Function) {
    this.functions.set(name, value.bind(this.element, this.element));
  }

  call(name: string, ...params: any[]) {
    return this.functions.get(name)!(...params);
  }
}

export default Inner;
