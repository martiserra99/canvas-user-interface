import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const root = canvasUI.layout.new("root", "grid");

root.set("size", {
  width: "auto",
  height: "auto",
});
root.set("dimensions", {
  columns: [{ count: 2, unit: "px", value: 300 }],
  rows: [{ count: 2, unit: "px", value: 300 }],
});
root.set("gap", {
  size: { horizontal: 20, vertical: 50 },
  color: "#000",
});
root.set("alignContent", { horizontal: "right", vertical: "bottom" });
root.set("alignItems", {
  horizontal: "right",
  vertical: "middle",
});
root.set("border", {
  size: 5,
  color: "#000",
});
root.set("corner", {
  type: "cut",
  size: 50,
});

const textArea1 = canvasUI.composite.new("textArea-1", "textArea");
const textArea2 = canvasUI.composite.new("textArea-2", "textArea");

root.insert(textArea1);
root.insert(textArea2);
textArea1.layoutParams.set("position", {
  row: 1,
  column: 1,
});

ui.start(root);
