import Element from '../generic/element';

import CompositeType from '../../type/specific/composite';

import { Size, Coords, Signal } from '../../types';

class Composite extends Element {
  private child: Element;

  constructor(id: string, type: CompositeType) {
    super(id, type);
    this.child = this.lifecycle.get('getElement')!();
  }

  start() {
    super.start();
    this.lifecycle.get('updateElement')!(this.child);
    this.child.start();
  }

  measure(maxSize: Size) {
    super.measure(maxSize);
    this.child.measure(maxSize);
    this.size = this.child.size;
  }

  locate(coords: Coords) {
    super.locate(coords);
    this.child.locate(coords);
    this.coords = coords;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    this.child.draw(ctx);
  }

  end() {
    super.end();
    this.child.end();
  }

  signal(signal: Signal) {
    super.signal(signal);
    this.child.signal(signal);
  }
}

export default Composite;
