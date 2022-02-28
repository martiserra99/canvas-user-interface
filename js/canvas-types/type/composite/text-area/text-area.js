import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onGetElement } from "./lifecycle/on-get-element.js";
import { onUpdateElement } from "./lifecycle/on-update-element.js";

export const newCompositeTextArea = function () {
  const textArea = canvasUI.composite.newType("text-area");

  textArea.set("size", { width: "auto", height: "auto" });
  textArea.set("background", "rgba(0,0,0,0)");
  textArea.set("border", { color: "#000", size: 0 });
  textArea.set("corner", { type: "cut", size: 0 });
  textArea.set("text", "Text");
  textArea.set("font", {
    size: 16,
    family: "Courier New",
    weight: 400,
    color: "#000",
  });
  textArea.set("align", {
    vertical: "middle",
    horizontal: "middle",
  });
  textArea.set("margin", {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  textArea.lifecycle.set("onGetElement", function (component, inner) {
    return onGetElement(component, inner);
  });

  textArea.lifecycle.set(
    "onUpdateElement",
    function (component, inner, element) {
      onUpdateElement(component, inner, element);
    }
  );
};
