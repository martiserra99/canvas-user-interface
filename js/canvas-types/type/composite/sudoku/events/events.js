import * as event from "../../../../utils/event.js";

export const addAllEvents = function (sudoku) {
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

  sudoku.events.set("number-pressed", function (sudoku, signal, state) {
    if (signal.type !== "keyup") return { check: false };
    const key = signal.data.key;
    if (isNaN(key)) return { check: false };
    const num = +key;
    if (num < 1 || num > 9) return { check: false };
    return { check: true, event: { num } };
  });

  sudoku.events.set("backspace-pressed", function (sudoku, signal, state) {
    if (signal.type !== "keyup") return { check: false };
    if (signal.data.key !== "Backspace") return { check: false };
    return { check: true };
  });
};
