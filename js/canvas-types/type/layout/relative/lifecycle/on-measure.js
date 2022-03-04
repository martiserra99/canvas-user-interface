import * as compute from "../../../../utils/compute.js";

export const onMeasure = function (layout, inner, maxSize) {
  inner.set("desiredSize", getDesiredSize(layout, maxSize));
  inner.set("size", getSize(inner, maxSize));
};

const getDesiredSize = (layout, maxSize) =>
  compute.computeDesiredSize(layout.get("size"), maxSize);

const getSize = (inner, maxSize) =>
  compute.computeAvailableSize(inner.get("desiredSize"), maxSize);
