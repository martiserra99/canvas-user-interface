export class Events {
  constructor(events) {
    this._events = new Map();
    this._setEvents(events);
  }

  _setEvents(events) {
    for (const [name, { check, callbacks }] of events)
      this._events.set(name, {
        check,
        state: new Map(),
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
