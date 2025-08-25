import canvasUI, { View, Size } from '../../index';

import measure from '../../types/utils.measure';
import draw from '../../types/utils.draw';

export default function() {
  const area = canvasUI.view.newType('area');

  area.set('size', {
    width: { unit: 'px', value: 100 },
    height: { unit: 'px', value: 100 },
  });
  area.set('background', '#000');
  area.set('border', { color: '#000', size: 0 });
  area.set('corner', { type: 'cut', size: 0 });

  area.lifecycle.set('getSize', function(area: View, maxSize: Size) {
    const desiredSize = measure.desiredSize(area.get('size'), maxSize);
    return measure.size(desiredSize, maxSize);
  });

  area.lifecycle.set('drawItself', function(
    area: View,
    ctx: CanvasRenderingContext2D
  ) {
    const coords = area.coords;
    const size = area.size;
    const background = area.get('background');
    const border = area.get('border');
    const corner = area.get('corner');
    draw.area(ctx, coords, size, background, border, corner);
  });
}
