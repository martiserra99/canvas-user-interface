import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const root = canvasUI.layout.new("root", "frame");

const sudokuFrame = canvasUI.layout.new("sudoku-frame", "frame");

sudokuFrame.set("size", { width: "auto", height: "auto" });

const sudokuGrid1 = canvasUI.layout.new("grid-squares-1", "grid-squares");
sudokuGrid1.set("dimensions", { rows: 9, columns: 9 });
sudokuGrid1.get("squares").size = 50;

const sudokuGrid2 = canvasUI.layout.new("grid-squares-2", "grid-squares");
sudokuGrid2.set("dimensions", { rows: 3, columns: 3 });
sudokuGrid2.get("squares").size = 150;
sudokuGrid2.get("lines").size = 3;
sudokuGrid2.get("lines").outside = true;

sudokuFrame.insert(sudokuGrid1);

sudokuGrid1.insert(sudokuGrid2);

root.insert(sudokuFrame);
sudokuFrame.layoutParams.set("gravity", {
  horizontal: "middle",
  vertical: "middle",
});

const textArea = canvasUI.composite.new("text-area-1", "text-area");

textArea.set("size", {
  width: { unit: "px", value: 50 },
  height: { unit: "px", value: 50 },
});

textArea.set("text", 5);

textArea.get("font").size = 30;

sudokuGrid1.insert(textArea);

textArea.layoutParams.set("position", { row: 8, column: 8 });

ui.start(root);
