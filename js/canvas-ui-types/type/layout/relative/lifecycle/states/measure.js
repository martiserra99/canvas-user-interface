import { measure } from "../../../../../utils/measure.js";

export const setupMeasureLifecycleFunctions = function (relative) {
  relative.lifecycle.set("onMeasure", function (relative, maxSize) {
    const desiredSize = measure.desiredSize(relative.get("size"), maxSize);
    const size = measure.availableSize(desiredSize, maxSize);
    relative.inner.set("desiredSize", desiredSize);
    relative.inner.set("size", size);
  });

  relative.lifecycle.set("sortchildrenToMeasure", function (relative) {
    return relative.inner.get("sortedchildren");
  });

  relative.lifecycle.set(
    "getChildMaxSize",
    function (relative, maxSize, child) {
      const notPositionedchildren = relative.inner.get("notPositionedchildren");
      if (notPositionedchildren.includes(child)) return { width: 0, height: 0 };

      const margin = child.layoutParams.get("margin");

      let width =
        relative.inner.call("getChildMaxRight", child) -
        relative.inner.call("getChildMaxLeft", child) -
        margin.left -
        margin.right;
      if (width < 0) width = 0;

      let height =
        relative.inner.call("getChildMaxBottom", child) -
        relative.inner.call("getChildMaxTop", child) -
        margin.top -
        margin.bottom;
      if (height < 0) height = 0;

      return { width, height };
    }
  );

  relative.lifecycle.set("getSize", function (relative) {
    return relative.inner.get("size");
  });
};
