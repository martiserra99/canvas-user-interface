import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const frame = canvasUI.layout.new("frame", "frame");

const textArea = canvasUI.composite.new("text-area", "text-area");

textArea.set("size", {
  width: { unit: "px", value: 200 },
  height: { unit: "px", value: 100 },
});
textArea.set("background", "#000");
textArea.get("font").color = "#fff";
textArea.set("align", { horizontal: "middle", vertical: "middle" });

frame.insert(textArea);

textArea.layoutParams.get("gravity").horizontal = "middle";
textArea.layoutParams.get("gravity").vertical = "middle";

ui.start(frame);
