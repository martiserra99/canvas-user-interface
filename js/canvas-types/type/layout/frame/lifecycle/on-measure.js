import * as compute from "../../../../utils/compute.js";

export const onMeasure = function (layout, inner, maxSize) {
  inner.set("desiredSize", getDesiredSize(layout, maxSize));
  inner.set("availableSize", getAvailableSize(inner, maxSize));
  inner.set("availableSizeNoBorder", getAvailableSizeNoBorder(layout, inner));
};

const getDesiredSize = (layout, maxSize) =>
  compute.computeDesiredSize(layout.get("size"), maxSize);

const getAvailableSize = (inner, maxSize) =>
  compute.computeAvailableSize(inner.get("desiredSize"), maxSize);

const getAvailableSizeNoBorder = (layout, inner) => ({
  width: inner.get("availableSize").width - layout.get("border").size * 2,
  height: inner.get("availableSize").height - layout.get("border").size * 2,
});
