import Element from './element/generic/element';

import { State } from './element/generic/dependencies/events';

export type Size = { width: number; height: number };
export type Coords = { x: number; y: number };

export type Signal = { type: string; data: any };

export type Check = (
  element: Element,
  signal: Signal,
  state: State
) => {
  event: boolean;
  data?: unknown;
};
