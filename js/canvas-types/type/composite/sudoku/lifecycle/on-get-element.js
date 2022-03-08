import { canvasUI } from "../../../../../canvas-ui/canvas-ui.js";

export const onGetElement = function (composite, inner) {
  const frame = canvasUI.layout.new("frame", "frame");
  frame.set("size", { width: "auto", height: "auto" });

  const grid = canvasUI.layout.new("grid", "grid-squares");
  grid.set("dimensions", { rows: 9, columns: 9 });
  frame.insert(grid);

  const gridTop = canvasUI.layout.new("grid-top", "grid-squares");
  gridTop.set("dimensions", { rows: 3, columns: 3 });
  gridTop.get("lines").size = 3;
  grid.insert(gridTop);

  const cells = inner.get("cells");

  for (let column = 0; column < 9; column++) {
    for (let row = 0; row < 9; row++) {
      const textArea = canvasUI.composite.new(
        `text-area-${column},${row}`,
        "text-area"
      );
      textArea.set("text", "");
      textArea.get("border").color = composite.get("lines").color;
      grid.insert(textArea);
      textArea.layoutParams.set("position", { row, column });

      cells.get({ row, column }).textArea = textArea;
    }
  }

  return frame;
};
