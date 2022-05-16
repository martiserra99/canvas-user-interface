import { removeFromArray } from "../../../utils/utils.js";

export class Listeners {
  constructor(events) {
    this._events = events;
  }

  add(name, value) {
    this._events.get(name).callbacks.push(value);
  }

  remove(name, callback) {
    return removeFromArray(this._events.get(name).callbacks, callback);
  }

  removeAll(name) {
    const callbacks = this._events.get(name).callbacks;
    callbacks.splice(0, callbacks.length);
  }
}
