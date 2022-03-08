import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onGetElement } from "./lifecycle/on-get-element.js";
import { onUpdateElement } from "./lifecycle/on-update-element.js";

export const newCompositeSudoku = function () {
  const sudoku = canvasUI.composite.newType("sudoku");

  sudoku.set("size", 450);
  sudoku.set("text", { size: 26, color: "#777" });
  sudoku.set("lines", { color: "#ccc", outside: true });
  sudoku.set("background", "rgba(0,0,0,0)");

  sudoku.lifecycle.set("onGetElement", function (component, inner) {
    return onGetElement(component, inner);
  });

  sudoku.lifecycle.set("onUpdateElement", function (component, inner, element) {
    onUpdateElement(component, inner, element);
  });
};
