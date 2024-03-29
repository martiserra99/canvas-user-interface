import { LayoutType, Layout } from '../../../index';

import draw from '../../../types/utils.draw';

export default function(grid: LayoutType) {
  grid.lifecycle.set('drawItself', function(
    grid: Layout,
    ctx: CanvasRenderingContext2D
  ) {
    grid.inner.call('drawArea', ctx);
    grid.inner.call('drawGaps', ctx);
  });

  grid.inner.fun('drawArea', function(
    grid: Layout,
    ctx: CanvasRenderingContext2D
  ) {
    const coords = grid.coords;
    const size = grid.size;
    const background = grid.get('background');
    const border = grid.get('border');
    const corner = grid.get('corner');
    draw.area(ctx, coords, size, background, border, corner);
  });

  grid.inner.fun('drawGaps', function(
    grid: Layout,
    ctx: CanvasRenderingContext2D
  ) {
    grid.inner.call('drawHorizontalGaps', ctx);
    grid.inner.call('drawVerticalGaps', ctx);
  });

  grid.inner.fun('drawHorizontalGaps', function(
    grid: Layout,
    ctx: CanvasRenderingContext2D
  ) {
    const gridCoords = grid.inner.get('gridCoords');
    const gridSize = grid.inner.get('gridSize');

    const gap = grid.get('gap').size;
    const color = grid.get('gap').color;
    const rowsCoords = grid.inner.get('rowsCoords');

    for (let i = 1; i < rowsCoords.length; i++) {
      const x = gridCoords.x;
      const y = rowsCoords[i] - gap.vertical;
      const coords = { x, y };

      const width = gridSize.width;
      const height = gap.vertical;
      const size = { width, height };
      draw.rectangle(ctx, coords, size, color);
    }
  });

  grid.inner.fun('drawVerticalGaps', function(
    grid: Layout,
    ctx: CanvasRenderingContext2D
  ) {
    const gridCoords = grid.inner.get('gridCoords');
    const gridSize = grid.inner.get('gridSize');

    const gap = grid.get('gap').size;
    const color = grid.get('gap').color;
    const columnsCoords = grid.inner.get('columnsCoords');

    for (let i = 1; i < columnsCoords.length; i++) {
      const x = columnsCoords[i] - gap.horizontal;
      const y = gridCoords.y;
      const coords = { x, y };

      const width = gap.horizontal;
      const height = gridSize.height;
      const size = { width, height };
      draw.rectangle(ctx, coords, size, color);
    }
  });

  grid.lifecycle.set('sortChildrenToDraw', function(grid: Layout) {
    return [...grid.children].sort(
      (first, second) =>
        first.layoutParams.get('zIndex') - second.layoutParams.get('zIndex')
    );
  });
}
