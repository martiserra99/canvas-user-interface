import Element from '../generic/element';

import ViewType from '../../type/specific/view';

import { Size, Coords } from '../../types';

class View extends Element {
  constructor(id: string, type: ViewType) {
    super(id, type);
  }

  measure(maxSize: Size) {
    super.measure(maxSize);
    this.setSize(maxSize);
  }

  private setSize(maxSize: Size) {
    this.size = this.lifecycle.get('getSize')!(maxSize);
  }

  locate(coords: Coords) {
    super.locate(coords);
    this.setCoords(coords);
  }

  private setCoords(coords: Coords) {
    this.coords = coords;
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    this.drawItself(ctx);
  }

  private drawItself(ctx: CanvasRenderingContext2D) {
    this.lifecycle.get('drawItself')!(ctx);
  }
}

export default View;
