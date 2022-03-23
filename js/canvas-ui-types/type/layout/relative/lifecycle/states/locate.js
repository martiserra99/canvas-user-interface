export const setupLocateLifecycleFunctions = function (relative) {
  relative.lifecycle.set("onSortChildsToLocate", function (relative) {
    return relative.inner.get("sortedChilds");
  });

  relative.lifecycle.set(
    "onGetChildCoords",
    function (relative, coords, child) {
      const notPositionedChilds = relative.inner.get("notPositionedChilds");
      if (notPositionedChilds.includes(child)) return { x: 0, y: 0 };
      return {
        x: relative.inner.call("getChildLeft", child) + coords.x,
        y: relative.inner.call("getChildTop", child) + coords.y,
      };
    }
  );
};
