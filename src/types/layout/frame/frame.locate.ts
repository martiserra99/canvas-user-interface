import { LayoutType, Layout, Coords, Element } from '../../../index';

import locate from '../../../types/utils.locate';

export default function(frame: LayoutType) {
  frame.lifecycle.set('onLocate', function(frame: Layout, coords: Coords) {
    frame.inner.set('contentCoords', {
      x: coords.x + frame.get('border').size,
      y: coords.y + frame.get('border').size,
    });
  });

  frame.lifecycle.set('getChildCoords', function(
    frame: Layout,
    _: Coords,
    child: Element
  ) {
    return {
      x: frame.inner.call('getChildX', child),
      y: frame.inner.call('getChildY', child),
    };
  });

  frame.inner.fun('getChildX', function(frame: Layout, child: Element) {
    const start = frame.inner.get('contentCoords').x;
    const end = start + frame.inner.get('contentSize').width;
    const coords = { start, end };

    const length = child.size.width;

    const margin = {
      start: child.layoutParams.get('margin').left,
      end: child.layoutParams.get('margin').right,
    };

    const align = child.layoutParams.get('align').horizontal;

    if (align === 'left') return locate.alignStart(coords, length, margin);
    else if (align === 'middle')
      return locate.alignMiddle(coords, length, margin);
    else return locate.alignEnd(coords, length, margin);
  });

  frame.inner.fun('getChildY', function(frame: Layout, child: Element) {
    const start = frame.inner.get('contentCoords').y;
    const end = start + frame.inner.get('contentSize').height;
    const coords = { start, end };

    const length = child.size.height;

    const margin = {
      start: child.layoutParams.get('margin').top,
      end: child.layoutParams.get('margin').bottom,
    };

    const align = child.layoutParams.get('align').vertical;

    if (align === 'top') return locate.alignStart(coords, length, margin);
    else if (align === 'middle')
      return locate.alignMiddle(coords, length, margin);
    else return locate.alignEnd(coords, length, margin);
  });
}
