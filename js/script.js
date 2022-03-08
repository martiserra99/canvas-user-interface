import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const root = canvasUI.layout.new("root", "frame");

const sudoku = canvasUI.composite.new("sudoku", "sudoku");

sudoku.set("size", 450);
sudoku.get("text").size = 30;

root.insert(sudoku);

sudoku.layoutParams.set("gravity", {
  horizontal: "middle",
  vertical: "middle",
});

ui.start(root);

sudoku.listeners.add("click", function (element, event) {
  console.log(event.cell);
});
