import { LayoutType, Layout } from '../../../index';

import draw from '../../../types/utils.draw';

export default function(frame: LayoutType) {
  frame.lifecycle.set('drawItself', function(
    frame: Layout,
    ctx: CanvasRenderingContext2D
  ) {
    const coords = frame.coords;
    const size = frame.size;
    const background = frame.get('background');
    const border = frame.get('border');
    const corner = frame.get('corner');
    draw.area(ctx, coords, size, background, border, corner);
  });

  frame.lifecycle.set('sortChildrenToDraw', function(frame: Layout) {
    return [...frame.children].sort(
      (first, second) =>
        first.layoutParams.get('zIndex') - second.layoutParams.get('zIndex')
    );
  });
}
