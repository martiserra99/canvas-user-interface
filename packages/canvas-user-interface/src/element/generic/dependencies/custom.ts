/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Element from "../element";

class Custom {
  private element: Element;
  private properties: Map<string, any>;
  private functions: Map<string, Function>;

  constructor(element: Element) {
    this.element = element;
    this.properties = new Map();
    this.functions = new Map();
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

export default Custom;
