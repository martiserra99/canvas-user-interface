// UI
import { UI } from "./ui/ui.js";

// Types
import { ViewType } from "./type/specific/view.js";
import { LayoutType } from "./type/specific/layout.js";

// Drawables
import { View } from "./drawable/specific/view.js";
import { Layout } from "./drawable/specific/layout.js";

export const canvasUI = {
  ui: {
    new(selector) {
      return new UI(selector);
    },
  },

  view: {
    _types: new Map(),

    type(name) {
      const type = new ViewType(name);
      this._types.set(name, type);
      return type;
    },

    new(type) {
      const type = this._types.get(type);
      return new View(id, type);
    },
  },

  layout: {
    _types: new Map(),

    type(name) {
      const type = new LayoutType(name);
      this._types.set(name, type);
      return type;
    },

    new(type) {
      const type = this._types.get(type);
      return new Layout(id, type);
    },
  },
};
