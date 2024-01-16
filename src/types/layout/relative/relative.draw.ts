import { LayoutType, Layout } from '../../../index';

import draw from '../../../types/utils.draw';

export default function(relative: LayoutType) {
  relative.lifecycle.set('drawItself', function(
    relative: Layout,
    ctx: CanvasRenderingContext2D
  ) {
    const coords = relative.coords;
    const size = relative.size;
    const background = relative.get('background');
    const border = relative.get('border');
    const corner = relative.get('corner');
    draw.area(ctx, coords, size, background, border, corner);
  });

  relative.lifecycle.set('sortChildrenToDraw', function(relative: Layout) {
    return [...relative.children].sort(
      (first, second) =>
        first.layoutParams.get('zIndex') - second.layoutParams.get('zIndex')
    );
  });
}
