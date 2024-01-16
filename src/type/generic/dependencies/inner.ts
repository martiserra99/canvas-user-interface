class Inner {
  properties: Map<string, any>;
  functions: Map<string, Function>;

  constructor() {
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
    this.functions.set(name, value);
  }

  call(name: string, ...params: any[]) {
    return this.functions.get(name)!(...params);
  }
}

export default Inner;
