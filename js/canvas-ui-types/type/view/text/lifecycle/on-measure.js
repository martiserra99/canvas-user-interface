import { measure } from "../../../../utils/measure.js";

export const onMeasure = function (view, inner) {
  inner.set("textSize", getTextSize(view, inner));
};

const getTextSize = function (view, inner) {
  return measure.textSize(view.get("text"), view.get("font"));
};
