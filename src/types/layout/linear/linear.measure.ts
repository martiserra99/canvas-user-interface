import { LayoutType, Layout, Element, Size } from '../../../index';

import measure from '../../../types/utils.measure';

export default function(linear: LayoutType) {
  linear.lifecycle.set('onMeasure', function(linear: Layout, maxSize: Size) {
    const desiredSize = measure.desiredSize(linear.get('size'), maxSize);
    const availableSize = measure.availableSize(desiredSize, maxSize);
    const availableContentSize = {
      width: availableSize.width - linear.get('border').size * 2,
      height: availableSize.height - linear.get('border').size * 2,
    };

    linear.inner.set('desiredSize', desiredSize);
    linear.inner.set('availableSize', availableSize);
    linear.inner.set('availableContentSize', availableContentSize);
  });

  linear.lifecycle.set('sortChildrenToMeasure', function(linear: Layout) {
    return linear.inner.get('sortedChildren');
  });

  linear.lifecycle.set('getChildMaxSize', function(
    linear: Layout,
    maxSize: Size,
    child: Element,
    childrenWithSizes: Element[]
  ) {
    const width = linear.inner.call(
      'getChildMaxWidth',
      maxSize,
      child,
      childrenWithSizes
    );

    const height = linear.inner.call(
      'getChildMaxHeight',
      maxSize,
      child,
      childrenWithSizes
    );

    return { width, height };
  });

  linear.inner.fun('getChildMaxWidth', function(
    linear: Layout,
    _: Size,
    child: Element,
    childrenWithSizes: Element[]
  ) {
    const horizontal = linear.inner.get('horizontal');
    const availableContentSize = linear.inner.get('availableContentSize');

    const gap = linear.get('gap');
    const margin = child.layoutParams.get('margin');

    if (horizontal) {
      const usedWidth = childrenWithSizes.reduce((acc, child) => {
        const width = child.size.width;
        const margin = child.layoutParams.get('margin');
        return acc + width + margin.left + margin.right + gap;
      }, 0);

      const availableWidth = availableContentSize.width - usedWidth;
      let childMaxWidth = availableWidth - margin.left - margin.right;
      if (childMaxWidth < 0) childMaxWidth = 0;
      return childMaxWidth;
    }

    const availableWidth = availableContentSize.width;
    let childMaxWidth = availableWidth - margin.left - margin.right;
    if (childMaxWidth < 0) childMaxWidth = 0;
    return childMaxWidth;
  });

  linear.inner.fun('getChildMaxHeight', function(
    linear: Layout,
    _: Size,
    child: Element,
    childrenWithSizes: Element[]
  ) {
    const horizontal = linear.inner.get('horizontal');
    const availableContentSize = linear.inner.get('availableContentSize');

    const gap = linear.get('gap');
    const margin = child.layoutParams.get('margin');

    if (!horizontal) {
      const usedHeight = childrenWithSizes.reduce((acc, child) => {
        const height = child.size.height;
        const margin = child.layoutParams.get('margin');
        return acc + height + margin.top + margin.bottom + gap;
      }, 0);

      const availableHeight = availableContentSize.height - usedHeight;
      let childMaxHeight = availableHeight - margin.top - margin.bottom;
      if (childMaxHeight < 0) childMaxHeight = 0;
      return childMaxHeight;
    }

    const availableHeight = availableContentSize.height;
    let childMaxHeight = availableHeight - margin.top - margin.bottom;
    if (childMaxHeight < 0) childMaxHeight = 0;
    return childMaxHeight;
  });

  linear.lifecycle.set('getSize', function(linear: Layout, maxSize: Size) {
    const childrenSize = linear.inner.call('getChildrenSize');
    const size = measure.size(linear.inner.get('desiredSize'), maxSize, {
      width: () => childrenSize.width + linear.get('border').size * 2,
      height: () => childrenSize.height + linear.get('border').size * 2,
    });
    const contentSize = {
      width: size.width - linear.get('border').size * 2,
      height: size.height - linear.get('border').size * 2,
    };

    linear.inner.set('childrenSize', childrenSize);
    linear.inner.set('contentSize', contentSize);

    return size;
  });

  linear.inner.fun('getChildrenSize', function(linear: Layout) {
    const width = linear.inner.call('getChildrenWidth');
    const height = linear.inner.call('getChildrenHeight');
    return { width, height };
  });

  linear.inner.fun('getChildrenWidth', function(linear: Layout) {
    const horizontal = linear.inner.get('horizontal');

    if (horizontal) {
      const gap = linear.get('gap');
      return linear.children.reduce((acc, child, idx) => {
        const margin = child.layoutParams.get('margin');
        const width = child.size.width;
        if (idx === 0) return acc + width + margin.left + margin.right;
        return acc + width + margin.left + margin.right + gap;
      }, 0);
    }

    return linear.children.reduce((acc, child) => {
      const margin = child.layoutParams.get('margin');
      const width = child.size.width;
      const length = width + margin.left + margin.right;
      return acc > length ? acc : length;
    }, 0);
  });

  linear.inner.fun('getChildrenHeight', function(linear: Layout) {
    const horizontal = linear.inner.get('horizontal');

    if (!horizontal) {
      const gap = linear.get('gap');
      return linear.children.reduce((acc, child, idx) => {
        const margin = child.layoutParams.get('margin');
        const height = child.size.height;
        if (idx === 0) return acc + height + margin.top + margin.bottom;
        return acc + height + margin.top + margin.bottom + gap;
      }, 0);
    }

    return linear.children.reduce((acc, child) => {
      const margin = child.layoutParams.get('margin');
      const height = child.size.height;
      const length = height + margin.top + margin.bottom;
      return acc > length ? acc : length;
    }, 0);
  });
}
