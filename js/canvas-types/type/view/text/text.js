import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onMeasure } from "./lifecycle/on-measure.js";
import { onGetSize } from "./lifecycle/on-get-size.js";
import { onLocate } from "./lifecycle/on-locate.js";
import { onDrawItself } from "./lifecycle/on-draw-itself.js";

export const newViewText = function () {
  const text = canvasUI.view.newType("text");

  text.set("text", "Text");
  text.set("font", {
    size: 16,
    family: "Courier New",
    weight: 400,
    color: "#000",
  });
  text.set("align", {
    vertical: "middle",
    horizontal: "left",
  });

  text.lifecycle.set("onMeasure", function (view, inner) {
    onMeasure(view, inner);
  });

  text.lifecycle.set("onGetSize", function (view, inner, maxSize) {
    return onGetSize(view, inner, maxSize);
  });

  text.lifecycle.set("onLocate", function (view, inner, coords) {
    onLocate(view, inner, coords);
  });

  text.lifecycle.set("onDrawItself", function (view, inner, ctx) {
    onDrawItself(view, inner, ctx);
  });
};
