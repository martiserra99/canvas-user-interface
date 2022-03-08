import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onMeasure } from "./lifecycle/on-measure.js";
import { onGetChildMaxSize } from "./lifecycle/on-get-child-max-size.js";
import { onGetChildCoords } from "./lifecycle/on-get-child-coords.js";
import { onDrawItself } from "./lifecycle/on-draw-itself.js";
import { onSortChildsToDraw } from "./lifecycle/on-sort-childs-to-draw.js";

import * as event from "../../../utils/event.js";

export const newLayoutGridSquares = function () {
  const gridSquares = canvasUI.layout.newType("grid-squares");

  gridSquares.set("dimensions", { rows: 5, columns: 5 });
  gridSquares.set("squares", { size: 100 });
  gridSquares.set("lines", { color: "#cccccc", size: 1, outside: false });
  gridSquares.set("background", "rgba(0,0,0,0)");

  gridSquares.childLayoutParams.set("position", { row: 0, column: 0 });
  gridSquares.childLayoutParams.set("z-index", 0);

  gridSquares.lifecycle.set("onMeasure", function (layout, inner, maxSize) {
    onMeasure(layout, inner, maxSize);
  });

  gridSquares.lifecycle.set(
    "onGetChildMaxSize",
    function (layout, inner, maxSize, child, childsWithSizes) {
      return onGetChildMaxSize(layout, inner, child);
    }
  );

  gridSquares.lifecycle.set("onGetSize", function (layout, inner, maxSize) {
    return inner.get("size");
  });

  gridSquares.lifecycle.set(
    "onGetChildCoords",
    function (layout, inner, coords, child, childsWithSizes) {
      return onGetChildCoords(inner, coords, child);
    }
  );

  gridSquares.lifecycle.set("onDrawItself", function (layout, inner, ctx) {
    onDrawItself(layout, inner, ctx);
  });

  gridSquares.lifecycle.set("onSortChildsToDraw", function (layout, inner) {
    return onSortChildsToDraw(layout, inner);
  });

  event.addAllEvents(gridSquares, {
    areCoordsInElement: (element, coords) =>
      event.areCoordsInRectangle(element, coords),
    getMouseEvent: (element, signal, state) => {
      const coords = {
        x: signal.data.coords.x - element.coords.x,
        y: signal.data.coords.y - element.coords.y,
      };
      const cell = event.getCellFromCoords(
        element.size,
        element.get("dimensions"),
        coords
      );
      return { coords, cell };
    },
    getKeyEvent: (element, signal, state) => signal.data,
  });
};
