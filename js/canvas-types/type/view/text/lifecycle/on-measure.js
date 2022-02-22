import * as compute from "../../../../utils/compute.js";

export const onMeasure = function (view, inner) {
  inner.set("textSize", getTextSize(view, inner));
};

const getTextSize = function (view, inner) {
  return compute.computeTextSize(view.get("text"), view.get("font"));
};
