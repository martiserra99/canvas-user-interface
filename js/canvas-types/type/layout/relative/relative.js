import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onStart } from "./lifecycle/on-start.js";
import { onMeasure } from "./lifecycle/on-measure.js";
import { onGetChildMaxSize } from "./lifecycle/on-get-child-max-size.js";
import { onGetChildCoords } from "./lifecycle/on-get-child-coords.js";
import { onDrawItself } from "./lifecycle/on-draw-itself.js";

export const newLayoutRelative = function () {
  const relative = canvasUI.layout.newType("relative");

  relative.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "%", value: 100 },
  });
  relative.set("background", "rgba(0,0,0,0)");
  relative.set("border", { color: "#000", size: 0 });
  relative.set("corner", { type: "cut", size: 0 });

  relative.childLayoutParams.set("attachTo", {
    top: null,
    right: null,
    bottom: null,
    left: null,
  });
  relative.childLayoutParams.set("bias", { vertical: 50, horizontal: 50 });
  relative.childLayoutParams.set("margin", {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  relative.lifecycle.set("onStart", function (layout, inner) {
    onStart(layout, inner);
  });

  relative.lifecycle.set("onMeasure", function (layout, inner, maxSize) {
    onMeasure(layout, inner, maxSize);
  });

  relative.lifecycle.set("onSortChildsToSetSizes", function (layout, inner) {
    return inner.get("sortedChilds");
  });

  relative.lifecycle.set(
    "onGetChildMaxSize",
    function (layout, inner, maxSize, child) {
      return onGetChildMaxSize(layout, inner, maxSize, child);
    }
  );

  relative.lifecycle.set("onGetSize", function (layout, inner, maxSize) {
    return inner.get("size");
  });

  relative.lifecycle.set("onSortChildsToSetCoords", function (layout, inner) {
    return inner.get("sortedChilds");
  });

  relative.lifecycle.set(
    "onGetChildCoords",
    function (layout, inner, coords, child) {
      return onGetChildCoords(layout, inner, coords, child);
    }
  );

  relative.lifecycle.set("onDrawItself", function (layout, inner, ctx) {
    onDrawItself(layout, inner, ctx);
  });
};
