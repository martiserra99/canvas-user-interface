import { draw } from "../../../../utils/draw.js";

export const onDrawItself = function (view, inner, ctx) {
  draw.text(
    ctx,
    view.coords,
    view.size,
    inner.get("textCoords"),
    view.get("text"),
    view.get("font")
  );
};
