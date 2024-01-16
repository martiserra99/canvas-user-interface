import canvasUI from '../../../index';

import utils from './relative.utils';
import start from './relative.start';
import measure from './relative.measure';
import locate from './relative.locate';
import draw from './relative.draw';

export default function() {
  const relative = canvasUI.layout.newType('relative');

  relative.set('size', {
    width: { unit: '%', value: 100 },
    height: { unit: '%', value: 100 },
  });
  relative.set('background', 'rgba(0,0,0,0)');
  relative.set('border', { color: '#000', size: 0 });
  relative.set('corner', { type: 'cut', size: 0 });

  relative.layoutParams.set('attachTo', {
    top: null,
    right: null,
    bottom: null,
    left: null,
  });
  relative.layoutParams.set('bias', { vertical: 50, horizontal: 50 });
  relative.layoutParams.set('zIndex', 0);
  relative.layoutParams.set('margin', { top: 0, right: 0, bottom: 0, left: 0 });

  utils(relative);
  start(relative);
  measure(relative);
  locate(relative);
  draw(relative);
}
