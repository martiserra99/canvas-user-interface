export class Events {
  constructor(events) {
    this._events = new Map();
    this._setEvents(events);
  }

  _setEvents(events) {
    for (const [name, { check, callbacks }] of events)
      this._events.set(name, {
        check,
        state: new State(),
        callbacks: [...callbacks],
      });
  }

  [Symbol.iterator]() {
    return this._events[Symbol.iterator]();
  }

  get(name) {
    return this._events.get(name);
  }
}

class State {
  constructor(element) {
    this._properties = new Map();
  }

  set(name, value) {
    this._properties.set(name, value);
  }

  get(name, value) {
    if (!this._properties.has(name)) return value;
    return this._properties.get(name);
  }
}
