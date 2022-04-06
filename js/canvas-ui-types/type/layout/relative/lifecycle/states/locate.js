export const setupLocateLifecycleFunctions = function (relative) {
  relative.lifecycle.set("sortChildrenToLocate", function (relative) {
    return relative.inner.get("sortedChildren");
  });

  relative.lifecycle.set("getChildCoords", function (relative, coords, child) {
    const notPositionedChildren = relative.inner.get("notPositionedChildren");
    if (notPositionedChildren.includes(child)) return { x: 0, y: 0 };
    return {
      x: relative.inner.call("getChildLeft", child) + coords.x,
      y: relative.inner.call("getChildTop", child) + coords.y,
    };
  });
};
