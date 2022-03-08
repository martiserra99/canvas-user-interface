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
};
