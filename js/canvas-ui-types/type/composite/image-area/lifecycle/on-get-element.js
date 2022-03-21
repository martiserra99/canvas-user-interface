import { canvasUI } from "../../../../../canvas-ui/canvas-ui.js";

export const onGetElement = function (composite, inner) {
  const frame = canvasUI.layout.new("frame", "frame");
  const image = canvasUI.view.new("image", "image");
  frame.insert(image);
  return frame;
};
