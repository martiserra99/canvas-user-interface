import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const frame = canvasUI.layout.new("frame", "frame");

const text = canvasUI.view.new("text", "text");
text.set("text", "Hello!");
text.get("font").size = 32;

frame.insert(text);

text.layoutParams.set("gravity", { horizontal: "middle", vertical: "middle" });

ui.start(frame);
