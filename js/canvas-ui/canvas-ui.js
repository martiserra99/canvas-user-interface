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
