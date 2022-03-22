import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

import { measure } from "../../../utils/measure.js";
import { draw } from "../../../utils/draw.js";

export const newViewImage = function () {
  const image = canvasUI.view.newType("image");

  image.set("size", { width: 100, height: 100 });
  image.set("src", "");

  image.lifecycle.set("onCreate", function (image, inner) {
    image.inner.set("img", new Image());
  });

  image.lifecycle.set("onStart", function (image, inner) {
    if (image.inner.get("img").src !== image.get("src"))
      image.inner.get("img").src = image.get("src");
  });

  image.lifecycle.set("onGetSize", function (image, inner, maxSize) {
    return measure.size(image.get("size"), maxSize);
  });

  image.lifecycle.set("onDrawItself", function (image, inner, ctx) {
    draw.image(ctx, image.coords, image.size, image.inner.get("img"));
  });
};
