import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onMeasure } from "./lifecycle/on-measure.js";
import { onGetChildMaxSize } from "./lifecycle/on-get-child-max-size.js";
import { onGetChildCoords } from "./lifecycle/on-get-child-coords.js";
import { onDrawItself } from "./lifecycle/on-draw-itself.js";
import { onSortChildsToDraw } from "./lifecycle/on-sort-childs-to-draw.js";

export const newLayoutSquares = function () {
  const squares = canvasUI.layout.newType("squares");

  squares.set("dimensions", { rows: 5, columns: 5 });
  squares.set("squares", { size: 100 });
  squares.set("lines", { color: "#cccccc", size: 1, outside: false });
  squares.set("background", "rgba(0,0,0,0)");

  squares.childLayoutParams.set("position", { row: 0, column: 0 });
  squares.childLayoutParams.set("z-index", 0);

  squares.lifecycle.set("onMeasure", function (layout, inner, maxSize) {
    onMeasure(layout, inner, maxSize);
  });

  squares.lifecycle.set(
    "onGetChildMaxSize",
    function (layout, inner, maxSize, child, childsWithSizes) {
      return onGetChildMaxSize(layout, inner, child);
    }
  );

  squares.lifecycle.set("onGetSize", function (layout, inner, maxSize) {
    return inner.get("size");
  });

  squares.lifecycle.set(
    "onGetChildCoords",
    function (layout, inner, coords, child, childsWithSizes) {
      return onGetChildCoords(inner, coords, child);
    }
  );

  squares.lifecycle.set("onDrawItself", function (layout, inner, ctx) {
    onDrawItself(layout, inner, ctx);
  });

  squares.lifecycle.set("onSortChildsToDraw", function (layout, inner) {
    return onSortChildsToDraw(layout, inner);
  });
};
