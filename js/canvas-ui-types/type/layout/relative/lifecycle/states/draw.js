import { draw } from "../../../../../utils/draw.js";

export const setupDrawLifecycleFunctions = function (relative) {
  relative.lifecycle.set("drawItself", function (relative, ctx) {
    const coords = relative.coords;
    const size = relative.size;
    const background = relative.get("background");
    const border = relative.get("border");
    const corner = relative.get("corner");
    draw.area(ctx, coords, size, background, border, corner);
  });

  relative.lifecycle.set("sortchildrenToDraw", function (relative) {
    return [...relative.children].sort(
      (first, second) =>
        first.layoutParams.get("zIndex") - second.layoutParams.get("zIndex")
    );
  });
};
