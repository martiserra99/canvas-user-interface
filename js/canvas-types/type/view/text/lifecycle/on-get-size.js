import * as compute from "../../../../utils/compute.js";

export const onGetSize = function (view, inner, maxSize) {
  return compute.computeSize(inner.get("textSize"), maxSize);
};
