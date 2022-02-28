import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onMeasure } from "./lifecycle/on-measure.js";
import { onGetChildMaxSize } from "./lifecycle/on-get-child-max-size.js";
import { onGetSize } from "./lifecycle/on-get-size.js";
import { onLocate } from "./lifecycle/on-locate.js";
import { onGetChildCoords } from "./lifecycle/on-get-child-coords.js";
import { onDrawItself } from "./lifecycle/on-draw-itself.js";
import { onSortChildsToDraw } from "./lifecycle/on-sort-childs-to-draw.js";

export const newLayoutFrame = function () {
  const frame = canvasUI.layout.newType("frame");

  frame.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "%", value: 100 },
  });
  frame.set("background", "rgba(0,0,0,0)");
  frame.set("border", { color: "#000", size: 0 });
  frame.set("corner", { type: "cut", size: 0 });

  frame.childLayoutParams.set("gravity", {
    horizontal: "left",
    vertical: "top",
  });
  frame.childLayoutParams.set("zIndex", 0);
  frame.childLayoutParams.set("margin", {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  frame.lifecycle.set("onMeasure", function (layout, inner, maxSize) {
    onMeasure(layout, inner, maxSize);
  });

  frame.lifecycle.set(
    "onGetChildMaxSize",
    function (layout, inner, maxSize, child) {
      return onGetChildMaxSize(layout, inner, maxSize, child);
    }
  );

  frame.lifecycle.set("onGetSize", function (layout, inner, maxSize) {
    return onGetSize(layout, inner, maxSize);
  });

  frame.lifecycle.set("onLocate", function (layout, inner, coords) {
    onLocate(layout, inner, coords);
  });

  frame.lifecycle.set(
    "onGetChildCoords",
    function (layout, inner, coords, child) {
      return onGetChildCoords(layout, inner, coords, child);
    }
  );

  frame.lifecycle.set("onDrawItself", function (layout, inner, ctx) {
    onDrawItself(layout, inner, ctx);
  });

  frame.lifecycle.set("onSortChildsToDraw", function (layout, inner) {
    return onSortChildsToDraw(layout, inner);
  });
};
