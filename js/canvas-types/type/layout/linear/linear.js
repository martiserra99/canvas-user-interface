import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onStart } from "./lifecycle/on-start.js";
import { onMeasure } from "./lifecycle/on-measure.js";
import { onGetChildMaxSize } from "./lifecycle/on-get-child-max-size.js";
import { onGetSize } from "./lifecycle/on-get-size.js";
import { onLocate } from "./lifecycle/on-locate.js";
import { onGetChildCoords } from "./lifecycle/on-get-child-coords.js";
import { onDrawItself } from "./lifecycle/on-draw-itself.js";

import * as event from "../../../utils/event.js";

export const newLayoutLinear = function () {
  const linear = canvasUI.layout.newType("linear");

  linear.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "%", value: 100 },
  });
  linear.set("direction", "horizontal");
  linear.set("gravityContent", "middle");
  linear.set("alignItems", "middle");
  linear.set("gap", 0);
  linear.set("background", "rgba(0,0,0,0)");
  linear.set("border", { color: "#000", size: 0 });
  linear.set("corner", { type: "cut", size: 0 });

  linear.childLayoutParams.set("position", 0);
  linear.childLayoutParams.set("alignSelf", "auto");
  linear.childLayoutParams.set("margin", {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  linear.lifecycle.set("onStart", function (layout, inner) {
    onStart(layout, inner);
  });

  linear.lifecycle.set("onMeasure", function (layout, inner, maxSize) {
    onMeasure(layout, inner, maxSize);
  });

  linear.lifecycle.set("onSortChildsToMeasure", function (layout, inner) {
    return inner.get("sortedChilds");
  });

  linear.lifecycle.set(
    "onGetChildMaxSize",
    function (layout, inner, maxSize, child, childsWithSizes) {
      return onGetChildMaxSize(layout, inner, child, childsWithSizes);
    }
  );

  linear.lifecycle.set("onGetSize", function (layout, inner, maxSize) {
    return onGetSize(layout, inner, maxSize);
  });

  linear.lifecycle.set("onSortChildsToLocate", function (layout, inner) {
    return inner.get("sortedChilds");
  });

  linear.lifecycle.set("onLocate", function (layout, inner, coords) {
    onLocate(layout, inner, coords);
  });

  linear.lifecycle.set(
    "onGetChildCoords",
    function (linear, inner, coords, child, childsWithCoords) {
      return onGetChildCoords(linear, inner, coords, child, childsWithCoords);
    }
  );

  linear.lifecycle.set("onDrawItself", function (linear, inner, ctx) {
    onDrawItself(linear, inner, ctx);
  });

  event.addAllEvents(linear, {
    areCoordsInElement: (element, coords) =>
      event.areCoordsInArea(element, coords),
    getMouseEvent: (element, signal, state) => signal.data,
    getKeyEvent: (element, signal, state) => signal.data,
  });
};
