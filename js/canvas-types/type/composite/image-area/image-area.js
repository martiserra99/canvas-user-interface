import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onGetElement } from "./lifecycle/on-get-element.js";
import { onUpdateElement } from "./lifecycle/on-update-element.js";

import * as event from "../../../utils/event.js";

export const newCompositeImageArea = function () {
  const imageArea = canvasUI.composite.newType("image-area");

  imageArea.set("size", { width: "auto", height: "auto" });
  imageArea.set("background", "rgba(0,0,0,0)");
  imageArea.set("border", { color: "#000", size: 0 });
  imageArea.set("corner", { type: "cut", size: 0 });
  imageArea.set("imageSize", { width: 100, height: 100 });
  imageArea.set("imageSrc", "");
  imageArea.set("align", {
    vertical: "middle",
    horizontal: "middle",
  });
  imageArea.set("margin", {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  imageArea.lifecycle.set("onGetElement", function (composite, inner) {
    return onGetElement(composite, inner);
  });

  imageArea.lifecycle.set(
    "onUpdateElement",
    function (composite, inner, element) {
      onUpdateElement(composite, inner, element);
    }
  );

  event.addAllEvents(imageArea, {
    areCoordsInElement: (element, coords) =>
      event.areCoordsInArea(element, coords),
    getMouseEvent: (element, signal, state) => signal.data,
    getKeyEvent: (element, signal, state) => signal.data,
  });
};
