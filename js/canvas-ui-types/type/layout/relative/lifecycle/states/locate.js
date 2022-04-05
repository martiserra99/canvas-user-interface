export const setupLocateLifecycleFunctions = function (relative) {
  relative.lifecycle.set("sortchildrenToLocate", function (relative) {
    return relative.inner.get("sortedchildren");
  });

  relative.lifecycle.set("getChildCoords", function (relative, coords, child) {
    const notPositionedchildren = relative.inner.get("notPositionedchildren");
    if (notPositionedchildren.includes(child)) return { x: 0, y: 0 };
    return {
      x: relative.inner.call("getChildLeft", child) + coords.x,
      y: relative.inner.call("getChildTop", child) + coords.y,
    };
  });
};
