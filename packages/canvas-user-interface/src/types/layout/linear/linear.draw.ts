import { LayoutType, Layout } from '../../../index';

import draw from '../../../types/utils.draw';

export default function(linear: LayoutType) {
  linear.lifecycle.set('drawItself', function(
    linear: Layout,
    ctx: CanvasRenderingContext2D
  ) {
    const coords = linear.coords;
    const size = linear.size;
    const background = linear.get('background');
    const border = linear.get('border');
    const corner = linear.get('corner');
    draw.area(ctx, coords, size, background, border, corner);
  });
}
