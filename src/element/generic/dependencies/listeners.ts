import Events from './events';

import { removeFromArray } from '../../../utils';

class Listeners {
  private events: Events;

  constructor(events: Events) {
    this.events = events;
  }

  add(name: string, value: Function) {
    this.events.get(name)!.callbacks.push(value);
  }

  remove(name: string, callback: Function) {
    return removeFromArray(this.events.get(name)!.callbacks, callback);
  }

  removeAll(name: string) {
    const callbacks = this.events.get(name)!.callbacks;
    callbacks.splice(0, callbacks.length);
  }
}

export default Listeners;
