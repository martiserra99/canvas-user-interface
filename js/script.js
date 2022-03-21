import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const root = canvasUI.layout.new("root", "grid");

root.set("dimensions", {
  columns: [{ count: 2, unit: "px", length: 200 }],
  rows: [{ count: 2, unit: "px", length: 200 }],
});

root.set("gap", { horizontal: 50, vertical: 20 });

root.set("gapColor", "#000");

const text1 = canvasUI.view.new("text-1", "text");
const text2 = canvasUI.view.new("text-2", "text");

root.insert(text1);
root.insert(text2);

text1.layoutParams.set("position", { row: 1, column: 1 });

text1.listeners.add("click", function (element, data) {
  console.log(element, data);
});

ui.start(root);
