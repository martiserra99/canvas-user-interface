import { draw } from "../../../../../utils/draw.js";

export const setupDrawLifecycleFunctions = function (frame) {
  frame.lifecycle.set("drawItself", function (frame, ctx) {
    const coords = frame.coords;
    const size = frame.size;
    const background = frame.get("background");
    const border = frame.get("border");
    const corner = frame.get("corner");
    draw.area(ctx, coords, size, background, border, corner);
  });

  frame.lifecycle.set("sortchildrenToDraw", function (frame) {
    return [...frame.children].sort(
      (first, second) =>
        first.layoutParams.get("zIndex") - second.layoutParams.get("zIndex")
    );
  });
};
