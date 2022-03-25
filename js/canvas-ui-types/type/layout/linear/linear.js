import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { setupLifecycleFunctions } from "./lifecycle/lifecycle.js";

export const newLayoutLinear = function () {
  const linear = canvasUI.layout.newType("linear");

  linear.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "%", value: 100 },
  });
  linear.set("direction", "horizontal");
  linear.set("alignContent", "middle");
  linear.set("alignItems", "middle");
  linear.set("gap", 0);
  linear.set("background", "rgba(0,0,0,0)");
  linear.set("border", { color: "#000", size: 0 });
  linear.set("corner", { type: "cut", size: 0 });

  linear.layoutParams.set("position", 0);
  linear.layoutParams.set("alignSelf", "auto");
  linear.layoutParams.set("margin", { top: 0, right: 0, bottom: 0, left: 0 });

  setupLifecycleFunctions(linear);
};
