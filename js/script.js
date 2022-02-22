import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const frame = canvasUI.layout.new("frame", "frame");
frame.get("size").width.type = "%";
frame.get("size").width.value = 50;
frame.set("background", "#dfa");
frame.set("border", { color: "#132987", size: 10 });
frame.set("corner", { type: "round", size: 100 });

const text = canvasUI.view.new("text", "text");

frame.insert(text);

text.layoutParams.get("gravity").horizontal = "middle";
text.layoutParams.get("gravity").vertical = "middle";

const text2 = canvasUI.view.new("text2", "text");

frame.insert(text2);

text2.layoutParams.get("gravity").horizontal = "right";
text2.layoutParams.get("gravity").vertical = "bottom";

ui.start(frame);
