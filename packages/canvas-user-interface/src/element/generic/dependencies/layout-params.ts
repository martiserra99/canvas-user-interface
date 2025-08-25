/* eslint-disable @typescript-eslint/no-explicit-any */
import Element from "../element";

import Layout from "../../specific/layout";

import { clone } from "../../../utils";

class LayoutParams {
  private layoutParent: Layout;
  private layoutParams: Map<string, any>;

  constructor(element: Element) {
    this.layoutParent = element.layoutParent!;
    this.layoutParams = new Map();
    this.setLayoutParams();
  }

  private setLayoutParams() {
    for (const [name, value] of this.layoutParent.childLayoutParams)
      this.layoutParams.set(name, clone(value));
  }

  set(name: string, value: any) {
    if (!this.layoutParams.has(name)) return;
    this.layoutParams.set(name, value);
  }

  get(name: string) {
    return this.layoutParams.get(name);
  }
}

export default LayoutParams;
