import canvasUI from '../../../index';

import measure from './frame.measure';
import locate from './frame.locate';
import draw from './frame.draw';

export default function() {
  const frame = canvasUI.layout.newType('frame');

  frame.set('size', {
    width: { unit: '%', value: 100 },
    height: { unit: '%', value: 100 },
  });
  frame.set('background', 'rgba(0,0,0,0)');
  frame.set('border', { color: '#000', size: 0 });
  frame.set('corner', { type: 'cut', size: 0 });

  frame.layoutParams.set('align', { horizontal: 'left', vertical: 'top' });
  frame.layoutParams.set('zIndex', 0);
  frame.layoutParams.set('margin', { top: 0, right: 0, bottom: 0, left: 0 });

  measure(frame);
  locate(frame);
  draw(frame);
}
