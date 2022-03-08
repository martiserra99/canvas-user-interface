import * as event from "../../../../utils/event.js";

export const addAllEvents = function (gridSquares) {
  event.addAllEvents(gridSquares, {
    areCoordsInElement: (element, coords) =>
      event.areCoordsInRectangle(element, coords),
    getMouseEvent: (element, signal, state) => {
      const coords = {
        x: signal.data.coords.x - element.coords.x,
        y: signal.data.coords.y - element.coords.y,
      };
      const cell = event.getCellFromCoords(
        element.size,
        element.get("dimensions"),
        coords
      );
      return { coords, cell };
    },
    getKeyEvent: (element, signal, state) => signal.data,
  });
};
