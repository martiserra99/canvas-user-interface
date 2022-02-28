// UI
import { UI } from "./ui/ui.js";

// Types
import { ViewType } from "./type/specific/view.js";
import { LayoutType } from "./type/specific/layout.js";
import { CompositeType } from "./type/specific/composite.js";

// Elements
import { View } from "./element/specific/view.js";
import { Layout } from "./element/specific/layout.js";
import { Composite } from "./element/specific/composite.js";

export const canvasUI = {
  ui: {
    new(selector) {
      return new UI(selector);
    },
  },

  view: {
    _types: new Map(),

    newType(name) {
      const type = new ViewType(name);
      this._types.set(name, type);
      return type;
    },

    new(id, name) {
      const type = this._types.get(name);
      return new View(id, type);
    },
  },

  layout: {
    _types: new Map(),

    newType(name) {
      const type = new LayoutType(name);
      this._types.set(name, type);
      return type;
    },

    new(id, name) {
      const type = this._types.get(name);
      return new Layout(id, type);
    },
  },

  composite: {
    _types: new Map(),

    newType(name) {
      const type = new CompositeType(name);
      this._types.set(name, type);
      return type;
    },

    new(id, name) {
      const type = this._types.get(name);
      return new Composite(id, type);
    },
  },
};
