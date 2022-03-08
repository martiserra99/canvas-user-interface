import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onStart } from "./lifecycle/on-start.js";
import { onMeasure } from "./lifecycle/on-measure.js";
import { onGetChildMaxSize } from "./lifecycle/on-get-child-max-size.js";
import { onGetSize } from "./lifecycle/on-get-size.js";
import { onLocate } from "./lifecycle/on-locate.js";
import { onGetChildCoords } from "./lifecycle/on-get-child-coords.js";
import { onDrawItself } from "./lifecycle/on-draw-itself.js";

import * as event from "../../../utils/event.js";

export const newLayoutGrid = function () {
  const grid = canvasUI.layout.newType("grid");

  grid.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "%", value: 100 },
  });
  grid.set("dimensions", {
    columns: [{ count: 1, unit: "fr", length: 1 }],
    rows: [{ count: 1, unit: "fr", length: 1 }],
  });
  grid.set("gap", { vertical: 0, horizontal: 0 });
  grid.set("gravityContent", { vertical: "middle", horizontal: "middle" });
  grid.set("alignItems", { vertical: "middle", horizontal: "middle" });
  grid.set("background", "rgba(0,0,0,0)");
  grid.set("border", { color: "#000", size: 0 });
  grid.set("corner", { type: "cut", size: 0 });

  grid.childLayoutParams.set("position", "auto");
  grid.childLayoutParams.set("span", { columns: 1, rows: 1 });
  grid.childLayoutParams.set("alignSelf", {
    vertical: "auto",
    horizontal: "auto",
  });
  grid.childLayoutParams.set("margin", {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  grid.lifecycle.set("onStart", function (layout, inner) {
    onStart(layout, inner);
  });

  grid.lifecycle.set("onMeasure", function (layout, inner, maxSize) {
    onMeasure(layout, inner, maxSize);
  });

  grid.lifecycle.set(
    "onGetChildMaxSize",
    function (layout, inner, maxSize, child) {
      return onGetChildMaxSize(layout, inner, maxSize, child);
    }
  );

  grid.lifecycle.set("onGetSize", function (layout, inner, maxSize) {
    return onGetSize(layout, inner, maxSize);
  });

  grid.lifecycle.set("onLocate", function (layout, inner, coords) {
    onLocate(layout, inner, coords);
  });

  grid.lifecycle.set(
    "onGetChildCoords",
    function (layout, inner, coords, child) {
      return onGetChildCoords(layout, inner, child);
    }
  );

  grid.lifecycle.set("onDrawItself", function (layout, inner, ctx) {
    onDrawItself(layout, inner, ctx);
  });

  event.addAllEvents(grid, {
    areCoordsInElement: (element, coords) =>
      event.areCoordsInArea(element, coords),
    getMouseEvent: (element, signal, state) => signal.data,
    getKeyEvent: (element, signal, state) => signal.data,
  });
};
