/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TypeEvents from "../../../type/generic/dependencies/events";

import { Check } from "../../../types";

type Event = { check: Check; state: State; callbacks: Function[] };

class Events {
  private events: Map<string, Event>;

  constructor(events: TypeEvents) {
    this.events = new Map();
    this.setEvents(events);
  }

  private setEvents(events: TypeEvents) {
    for (const [name, { check, callbacks }] of events)
      this.events.set(name, {
        check,
        state: new State(),
        callbacks: [...callbacks],
      });
  }

  [Symbol.iterator]() {
    return this.events[Symbol.iterator]();
  }

  get(name: string) {
    return this.events.get(name);
  }
}

export class State {
  private keys: Map<string, any>;

  constructor() {
    this.keys = new Map();
  }

  set(name: string, value: any) {
    this.keys.set(name, value);
  }

  get(name: string, value: any) {
    if (!this.has(name)) return value;
    return this.keys.get(name);
  }

  del(name: string) {
    this.keys.delete(name);
  }

  has(name: string) {
    return this.keys.has(name);
  }
}

export default Events;
