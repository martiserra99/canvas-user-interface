import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { measure } from "../../../utils/measure.js";
import { draw } from "../../../utils/draw.js";

export const newViewArea = function () {
  const area = canvasUI.view.newType("area");

  area.set("size", {
    width: { unit: "px", value: 100 },
    height: { unit: "px", value: 100 },
  });
  area.set("background", "#000");
  area.set("border", { color: "#000", size: 0 });
  area.set("corner", { type: "cut", size: 0 });

  area.lifecycle.set("getSize", function (area, maxSize) {
    const desiredSize = measure.desiredSize(area.get("size"), maxSize);
    return measure.size(desiredSize, maxSize);
  });

  area.lifecycle.set("drawItself", function (area, ctx) {
    const coords = area.coords;
    const size = area.size;
    const background = area.get("background");
    const border = area.get("border");
    const corner = area.get("corner");
    draw.area(ctx, coords, size, background, border, corner);
  });
};
