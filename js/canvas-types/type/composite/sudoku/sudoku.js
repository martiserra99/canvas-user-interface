import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { onGetElement } from "./lifecycle/on-get-element.js";
import { onUpdateElement } from "./lifecycle/on-update-element.js";

import * as event from "../../../utils/event.js";

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

  event.addAllEvents(sudoku, {
    areCoordsInElement: (element, coords) =>
      event.areCoordsInRectangle(element, coords),
    getMouseEvent: (element, signal, state) => {
      const coords = {
        x: signal.data.coords.x - element.coords.x,
        y: signal.data.coords.y - element.coords.y,
      };
      const cell = event.getCellFromCoords(
        element.size,
        { rows: 9, columns: 9 },
        coords
      );
      return { coords, cell };
    },
    getKeyEvent: (element, signal, state) => signal.data,
  });
};
