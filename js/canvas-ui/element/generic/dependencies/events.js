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
  constructor() {
    this._keys = new Map();
  }

  set(name, value) {
    this._keys.set(name, value);
  }

  get(name, value) {
    if (!this.has(name)) return value;
    return this._keys.get(name);
  }

  del(name) {
    this._keys.delete(name);
  }

  has(name) {
    return this._keys.has(name);
  }
}
