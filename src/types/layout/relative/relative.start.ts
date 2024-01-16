import { LayoutType, Layout, Element } from '../../../index';

export default function(relative: LayoutType) {
  relative.lifecycle.set('onStart', function(relative: Layout) {
    const sortedPositionedChildren = relative.inner.call(
      'getSortedPositionedChildren'
    );
    const notPositionedChildren = relative.children.filter(
      child => !sortedPositionedChildren.includes(child)
    );
    const sortedChildren = [
      ...sortedPositionedChildren,
      ...notPositionedChildren,
    ];
    relative.inner.set('sortedChildren', sortedChildren);
    relative.inner.set('notPositionedChildren', notPositionedChildren);
  });

  relative.inner.fun('getSortedPositionedChildren', function(relative: Layout) {
    const sortedChildren = [];
    const children = [...relative.children];
    while (children.length > 0) {
      let inserted = false;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (relative.inner.call('canPositionChild', sortedChildren, child)) {
          sortedChildren.push(child);
          children.splice(i, 1);
          i--;
          inserted = true;
        }
      }
      if (!inserted) break;
    }
    return sortedChildren;
  });

  relative.inner.fun('canPositionChild', function(
    relative: Layout,
    children: Element[],
    child: Element
  ) {
    const { top, bottom, right, left } = child.layoutParams.get('attachTo');
    for (const direction of [top, bottom, right, left]) {
      if (
        direction !== null &&
        direction !== 'parent' &&
        !children.includes(relative.find(direction.child)!)
      ) {
        return false;
      }
    }
    return true;
  });
}
