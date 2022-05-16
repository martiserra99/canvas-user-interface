export const setupStartLifecycleFunctions = function (relative) {
  relative.lifecycle.set("onStart", function (relative) {
    const sortedPositionedChildren = relative.inner.call(
      "getSortedPositionedChildren"
    );
    const notPositionedChildren = relative.children.filter(
      (child) => !sortedPositionedChildren.includes(child)
    );
    const sortedChildren = [
      ...sortedPositionedChildren,
      ...notPositionedChildren,
    ];
    relative.inner.set("sortedChildren", sortedChildren);
    relative.inner.set("notPositionedChildren", notPositionedChildren);
  });

  relative.inner.fun("getSortedPositionedChildren", function (relative) {
    const sortedChildren = [];
    const children = [...relative.children];
    while (children.length > 0) {
      let inserted = false;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (relative.inner.call("canPositionChild", sortedChildren, child)) {
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

  relative.inner.fun("canPositionChild", function (relative, children, child) {
    const { top, bottom, right, left } = child.layoutParams.get("attachTo");
    for (const direction of [top, bottom, right, left]) {
      if (
        direction !== null &&
        direction !== "parent" &&
        !children.includes(direction)
      ) {
        return false;
      }
    }
    return true;
  });
};
