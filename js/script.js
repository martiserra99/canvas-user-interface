import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const frame = canvasUI.layout.new("frame", "frame");

const image = canvasUI.view.new("image", "image");

image.set("size", { width: 300, height: 300 });

image.set(
  "src",
  "https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1704&q=80"
);

frame.insert(image);

image.layoutParams.set("gravity", { horizontal: "middle", vertical: "middle" });

ui.start(frame);
