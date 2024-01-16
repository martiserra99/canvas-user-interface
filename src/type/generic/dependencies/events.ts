import Element from '../../../element/generic/element';

import { Coords, Check } from '../../../types';

class Events {
  private events: Map<string, { check: Check; callbacks: Function[] }>;

  constructor() {
    this.events = new Map();
    this.add();
  }

  [Symbol.iterator]() {
    return this.events[Symbol.iterator]();
  }

  set(name: string, check: Check) {
    this.events.set(name, { check, callbacks: [] });
  }

  get(name: string) {
    return this.events.get(name);
  }

  private add() {
    this.click();
    this.mousedown();
    this.mouseup();
    this.mouseenter();
    this.mouseleave();
    this.mousemove();
    this.keydown();
    this.keyup();
  }

  private click() {
    this.set('click', function(element, signal, state) {
      if (signal.type !== 'mousedown' && signal.type !== 'mouseup') {
        return { event: false };
      }
      const coords = signal.data as Coords;
      const isIn = coordsInElement(coords, element);
      if (signal.type === 'mousedown') {
        state.set('wasMouseDown', isIn);
        return { event: false };
      }
      const wasMouseDown = state.get('wasMouseDown', false) as boolean;
      const event = isIn && wasMouseDown;
      return { event, data: signal.data };
    });
  }

  private mousedown() {
    this.set('mousedown', function(element, signal) {
      if (signal.type !== 'mousedown') return { event: false };
      const coords = signal.data as Coords;
      if (!coordsInElement(coords, element)) return { event: false };
      return { event: true, data: signal.data };
    });
  }

  private mouseup() {
    this.set('mouseup', function(element, signal) {
      if (signal.type !== 'mouseup') return { event: false };
      const coords = signal.data as Coords;
      if (!coordsInElement(coords, element)) return { event: false };
      return { event: true, data: signal.data };
    });
  }

  private mouseenter() {
    this.set('mouseenter', function(element, signal, state) {
      if (signal.type === 'mouseleave') state.set('wasOut', true);
      if (signal.type !== 'mousemove') return { event: false };
      const coords = signal.data as Coords;
      const isIn = coordsInElement(coords, element);
      const wasOut = state.get('wasOut', true) as boolean;
      const event = isIn && wasOut;
      state.set('wasOut', !isIn);
      return { event, data: signal.data };
    });
  }

  private mouseleave() {
    this.set('mouseleave', function(element, signal, state) {
      if (signal.type === 'mouseleave') {
        state.set('wasIn', false);
        return { event: true, data: signal.data };
      }
      if (signal.type !== 'mousemove') return { event: false };
      const coords = signal.data as Coords;
      const isOut = !coordsInElement(coords, element);
      const wasIn = state.get('wasIn', false) as boolean;
      const event = isOut && wasIn;
      state.set('wasIn', !isOut);
      return { event, data: signal.data };
    });
  }

  private mousemove() {
    this.set('mousemove', function(element, signal) {
      if (signal.type !== 'mousemove') return { event: false };
      const coords = signal.data as Coords;
      if (!coordsInElement(coords, element)) return { event: false };
      return { event: true, data: signal.data };
    });
  }

  private keydown() {
    this.set('keydown', function(_, signal) {
      if (signal.type !== 'keydown') return { event: false };
      return { event: true, data: signal.data };
    });
  }

  private keyup() {
    this.set('keyup', function(_, signal) {
      if (signal.type !== 'keyup') return { event: false };
      return { event: true, data: signal.data };
    });
  }
}

function coordsInElement(coords: Coords, element: Element) {
  return (
    coords.x >= element.coords.x &&
    coords.y >= element.coords.y &&
    coords.x <= element.coords.x + element.size.width &&
    coords.y <= element.coords.y + element.size.height
  );
}

export default Events;
