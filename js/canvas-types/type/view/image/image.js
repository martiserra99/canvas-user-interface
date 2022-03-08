import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import * as compute from "../../../utils/compute.js";
import * as draw from "../../../utils/draw.js";
import * as event from "../../../utils/event.js";

export const newViewImage = function () {
  const image = canvasUI.view.newType("image");

  image.set("size", { width: 100, height: 100 });
  image.set("src", "");

  image.lifecycle.set("onCreate", function (view, inner) {
    inner.set("img", new Image());
  });

  image.lifecycle.set("onStart", function (view, inner) {
    if (inner.get("img").src !== view.get("src"))
      inner.get("img").src = view.get("src");
  });

  image.lifecycle.set("onGetSize", function (view, inner, maxSize) {
    return compute.computeSize(view.get("size"), maxSize);
  });

  image.lifecycle.set("onDrawItself", function (view, inner, ctx) {
    draw.drawImage(ctx, view.coords, view.size, inner.get("img"));
  });

  event.addAllEvents(image, {
    areCoordsInElement: (element, coords) =>
      event.areCoordsInRectangle(element, coords),
    getMouseEvent: (element, signal, state) => signal.data,
    getKeyEvent: (element, signal, state) => signal.data,
  });
};
