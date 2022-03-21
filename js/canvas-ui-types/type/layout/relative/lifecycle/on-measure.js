import { measure } from "../../../../utils/measure.js";

export const onMeasure = function (layout, inner, maxSize) {
  inner.set("desiredSize", getDesiredSize(layout, maxSize));
  inner.set("size", getSize(inner, maxSize));
};

const getDesiredSize = (layout, maxSize) =>
  measure.desiredSize(layout.get("size"), maxSize);

const getSize = (inner, maxSize) =>
  measure.availableSize(inner.get("desiredSize"), maxSize);
