import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const relative = canvasUI.layout.new("relative", "relative");

const squares = canvasUI.layout.new("squares", "squares");

squares.set("background", "white");
squares.set("lines", { outside: true, size: 1, color: "black" });

relative.insert(squares);

squares.layoutParams.set("attachTo", {
  top: "parent",
  right: "parent",
  bottom: "parent",
  left: "parent",
});

const textArea = canvasUI.composite.new("text-area-1", "text-area");

textArea.set("size", {
  width: { unit: "%", value: 100 },
  height: { unit: "%", value: 100 },
});
textArea.set("background", "black");
textArea.get("font").color = "white";

squares.insert(textArea);

textArea.layoutParams.set("position", { row: 1, column: 1 });

const textArea2 = canvasUI.composite.new("text-area-1", "text-area");

textArea2.set("size", {
  width: { unit: "%", value: 100 },
  height: { unit: "%", value: 100 },
});
textArea2.set("background", "#7fa000");
textArea2.get("font").color = "white";

squares.insert(textArea2);

textArea2.layoutParams.set("position", { row: 2, column: 2 });
textArea2.layoutParams.set("z-index", 1);

ui.start(relative);
