// UI
import UI from './ui';

// Types
import ViewType from './type/specific/view';
import LayoutType from './type/specific/layout';
import CompositeType from './type/specific/composite';

// Elements
import View from './element/specific/view';
import Layout from './element/specific/layout';
import Composite from './element/specific/composite';

// Element Types
import types from './types/types';

// TypeScript Types
export { default as ElementType } from './type/generic/element';
export { default as Element } from './element/generic/element';
export { Size, Coords, Signal, Check } from './types';
export { State } from './element/generic/dependencies/events';

export { UI, ViewType, LayoutType, CompositeType, View, Layout, Composite };

const viewTypes: Map<string, ViewType> = new Map();
const layoutTypes: Map<string, LayoutType> = new Map();
const compositeTypes: Map<string, CompositeType> = new Map();

type CanvasUI = {
  ui: {
    new: (selector: string | HTMLCanvasElement) => UI;
  };
  view: {
    newType: (name: string) => ViewType;
    new: (id: string, name: string) => View;
  };
  layout: {
    newType: (name: string) => LayoutType;
    new: (id: string, name: string) => Layout;
  };
  composite: {
    newType: (name: string) => CompositeType;
    new: (id: string, name: string) => Composite;
  };
};

const canvasUI: CanvasUI = {
  ui: {
    new(selector: string | HTMLCanvasElement) {
      return new UI(selector);
    },
  },
  view: {
    newType(name: string): ViewType {
      const type = new ViewType(name);
      viewTypes.set(name, type);
      return type;
    },
    new(id: string, name: string): View {
      const type = viewTypes.get(name)!;
      return new View(id, type);
    },
  },
  layout: {
    newType(name: string): LayoutType {
      const type = new LayoutType(name);
      layoutTypes.set(name, type);
      return type;
    },
    new(id: string, name: string): Layout {
      const type = layoutTypes.get(name)!;
      return new Layout(id, type);
    },
  },
  composite: {
    newType(name: string): CompositeType {
      const type = new CompositeType(name);
      compositeTypes.set(name, type);
      return type;
    },
    new(id: string, name: string): Composite {
      const type = compositeTypes.get(name)!;
      return new Composite(id, type);
    },
  },
};

types();

export default canvasUI;
