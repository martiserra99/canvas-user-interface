import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const frame = canvasUI.layout.new("frame", "frame");

const imageArea = canvasUI.composite.new("image-area", "image-area");

imageArea.set("size", {
  width: { unit: "px", value: 300 },
  height: { unit: "px", value: 300 },
});
imageArea.set("background", "#689");
imageArea.set("corner", { type: "round", size: 10 });

imageArea.set(
  "imageSrc",
  "https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1704&q=80"
);

frame.insert(imageArea);

imageArea.layoutParams.set("gravity", {
  horizontal: "middle",
  vertical: "middle",
});

ui.start(frame);
