import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { measure } from "../../../utils/measure.js";
import { locate } from "../../../utils/locate.js";
import { draw } from "../../../utils/draw.js";

export const newViewText = function () {
  const text = canvasUI.view.newType("text");

  text.set("text", "Text");
  text.set("font", { size: 16, family: "Courier New", weight: 400 });
  text.set("color", "#000");
  text.set("align", { vertical: "middle", horizontal: "left" });

  text.lifecycle.set("onMeasure", function (text) {
    const textSize = measure.textSize(text.get("text"), text.get("font"));
    text.inner.set("textSize", textSize);
  });

  text.lifecycle.set("getSize", function (text, maxSize) {
    return measure.size(text.inner.get("textSize"), maxSize);
  });

  text.lifecycle.set("onLocate", function (text, coords) {
    const textCoords = text.inner.call("getTextCoords", coords);
    text.inner.set("textCoords", textCoords);
  });

  text.inner.fun("getTextCoords", function (text, coords) {
    return {
      x: text.inner.call("getTextX", coords),
      y: text.inner.call("getTextY", coords),
    };
  });

  text.inner.fun("getTextX", function (text, coords) {
    const startCoord = coords.x;
    const endCoord = startCoord + text.size.width;
    const textCoords = { start: startCoord, end: endCoord };

    const textLength = text.inner.get("textSize").width;

    const align = text.get("align").horizontal;

    if (align === "left") return locate.alignStart(textCoords, textLength);
    else if (align === "middle")
      return locate.alignMiddle(textCoords, textLength);
    else return locate.alignEnd(textCoords, textLength);
  });

  text.inner.fun("getTextY", function (text, coords) {
    const startCoord = coords.y;
    const endCoord = startCoord + text.size.height;
    const textCoords = { start: startCoord, end: endCoord };

    const textLength = text.inner.get("textSize").height;

    const align = text.get("align").vertical;

    if (align === "top") return locate.alignStart(textCoords, textLength);
    else if (align === "middle")
      return locate.alignMiddle(textCoords, textLength);
    else return locate.alignEnd(textCoords, textLength);
  });

  text.lifecycle.set("drawItself", function (text, ctx) {
    draw.text(
      ctx,
      text.coords,
      text.size,
      text.inner.get("textCoords"),
      text.get("text"),
      text.get("font"),
      text.get("color")
    );
  });
};
