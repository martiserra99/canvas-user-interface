import * as draw from "../../../../utils/draw.js";

export const onDrawItself = function (layout, inner, ctx) {
  const coords = layout.coords;
  const size = layout.size;
  const background = layout.get("background");
  const border = layout.get("border");
  const corner = layout.get("corner");
  draw.drawRectangle(ctx, coords, size, background, border, corner);
};
