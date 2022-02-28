import { canvasUI } from "../../../../../canvas-ui/canvas-ui.js";

export const onGetElement = function (composite, inner) {
  const frame = canvasUI.layout.new("frame", "frame");
  const text = canvasUI.view.new("text", "text");
  frame.insert(text);
  return frame;
};
