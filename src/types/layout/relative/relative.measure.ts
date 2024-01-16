import { LayoutType, Layout, Element, Size } from '../../../index';

import measure from '../../../types/utils.measure';

export default function(relative: LayoutType) {
  relative.lifecycle.set('onMeasure', function(
    relative: Layout,
    maxSize: Size
  ) {
    const desiredSize = measure.desiredSize(relative.get('size'), maxSize);
    const size = measure.availableSize(desiredSize, maxSize);
    relative.inner.set('desiredSize', desiredSize);
    relative.inner.set('size', size);
  });

  relative.lifecycle.set('sortChildrenToMeasure', function(relative: Layout) {
    return relative.inner.get('sortedChildren');
  });

  relative.lifecycle.set('getChildMaxSize', function(
    relative: Layout,
    _: Size,
    child: Element
  ) {
    const notPositionedChildren = relative.inner.get('notPositionedChildren');
    if (notPositionedChildren.includes(child)) return { width: 0, height: 0 };

    const margin = child.layoutParams.get('margin');

    let width =
      relative.inner.call('getChildMaxRight', child) -
      relative.inner.call('getChildMaxLeft', child) -
      margin.left -
      margin.right;
    if (width < 0) width = 0;

    let height =
      relative.inner.call('getChildMaxBottom', child) -
      relative.inner.call('getChildMaxTop', child) -
      margin.top -
      margin.bottom;
    if (height < 0) height = 0;

    return { width, height };
  });

  relative.lifecycle.set('getSize', function(relative: Layout) {
    return relative.inner.get('size');
  });
}
