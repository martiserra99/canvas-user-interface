import { LayoutType, Layout, Element, Coords } from '../../../index';

export default function(relative: LayoutType) {
  relative.lifecycle.set('sortChildrenToLocate', function(relative: Layout) {
    return relative.inner.get('sortedChildren');
  });

  relative.lifecycle.set('getChildCoords', function(
    relative: Layout,
    coords: Coords,
    child: Element
  ) {
    const notPositionedChildren = relative.inner.get('notPositionedChildren');
    if (notPositionedChildren.includes(child)) return { x: 0, y: 0 };
    return {
      x: relative.inner.call('getChildLeft', child) + coords.x,
      y: relative.inner.call('getChildTop', child) + coords.y,
    };
  });
}
