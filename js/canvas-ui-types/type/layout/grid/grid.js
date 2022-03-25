import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { setupLifecycleFunctions } from "./lifecycle/lifecycle.js";

export const newLayoutGrid = function () {
  const grid = canvasUI.layout.newType("grid");

  grid.set("size", {
    width: { unit: "%", value: 100 },
    height: { unit: "%", value: 100 },
  });
  grid.set("dimensions", {
    columns: [{ count: 1, unit: "fr", value: 1 }],
    rows: [{ count: 1, unit: "fr", value: 1 }],
  });
  grid.set("gap", {
    size: { vertical: 0, horizontal: 0 },
    color: "rgba(0,0,0,0)",
  });
  grid.set("alignContent", { vertical: "middle", horizontal: "middle" });
  grid.set("alignItems", { vertical: "middle", horizontal: "middle" });
  grid.set("background", "rgba(0,0,0,0)");
  grid.set("border", { color: "#000", size: 0 });
  grid.set("corner", { type: "cut", size: 0 });

  grid.layoutParams.set("position", { column: 0, row: 0 });
  grid.layoutParams.set("span", { columns: 1, rows: 1 });
  grid.layoutParams.set("alignSelf", { vertical: "auto", horizontal: "auto" });
  grid.layoutParams.set("zIndex", 0);
  grid.layoutParams.set("margin", { top: 0, right: 0, bottom: 0, left: 0 });

  setupLifecycleFunctions(grid);
};
