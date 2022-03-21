import { measure } from "../../../../utils/measure.js";

export const onGetSize = function (view, inner, maxSize) {
  return measure.size(inner.get("textSize"), maxSize);
};
