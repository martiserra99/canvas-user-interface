import { draw } from "../../../../../utils/draw.js";

export const setupDrawLifecycleFunctions = function (linear) {
  linear.lifecycle.set("drawItself", function (linear, ctx) {
    const coords = linear.coords;
    const size = linear.size;
    const background = linear.get("background");
    const border = linear.get("border");
    const corner = linear.get("corner");
    draw.area(ctx, coords, size, background, border, corner);
  });
};
