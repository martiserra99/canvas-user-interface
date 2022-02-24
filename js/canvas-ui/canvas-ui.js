// UI
import { UI } from "./ui/ui.js";

// Types
import { ViewType } from "./type/specific/view.js";
import { LayoutType } from "./type/specific/layout.js";
import { ComponentType } from "./type/specific/component.js";

// Elements
import { View } from "./element/specific/view.js";
import { Layout } from "./element/specific/layout.js";
import { Component } from "./element/specific/component.js";

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

    new(id, name) {
      const type = this._types.get(name);
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

    new(id, name) {
      const type = this._types.get(name);
      return new Layout(id, type);
    },
  },

  component: {
    _types: new Map(),

    type(name) {
      const type = new ComponentType(name);
      this._types.set(name, type);
      return type;
    },

    new(id, name) {
      const type = this._types.get(name);
      return new Component(id, type);
    },
  },
};
