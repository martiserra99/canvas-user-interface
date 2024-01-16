import canvasUI, { View, Size } from '../../index';

import measure from '../../types/utils.measure';
import draw from '../../types/utils.draw';

export default function() {
  const image = canvasUI.view.newType('image');

  image.set('size', { width: 100, height: 100 });
  image.set('src', '');

  image.inner.set('lastSrc', '');

  image.lifecycle.set('onCreate', function(image: View) {
    image.inner.set('img', new Image());
  });

  image.lifecycle.set('onStart', function(image: View) {
    if (image.get('src') === image.inner.get('lastSrc')) return;
    image.inner.get('img').src = image.get('src');
  });

  image.lifecycle.set('getSize', function(image: View, maxSize: Size) {
    return measure.size(image.get('size'), maxSize);
  });

  image.lifecycle.set('drawItself', function(
    image: View,
    ctx: CanvasRenderingContext2D
  ) {
    draw.image(ctx, image.coords, image.size, image.inner.get('img'));
  });

  image.lifecycle.set('onEnd', function(image: View) {
    image.inner.set('lastSrc', image.get('src'));
  });
}
