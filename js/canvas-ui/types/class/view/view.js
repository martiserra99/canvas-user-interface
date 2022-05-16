import { newViewArea } from "./area/area.js";
import { newViewImage } from "./image/image.js";
import { newViewText } from "./text/text.js";

export const newViews = function () {
  newViewArea();
  newViewText();
  newViewImage();
};
