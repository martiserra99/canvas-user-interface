import { measure } from "../../../../utils/measure.js";

export const onMeasure = function (layout, inner, maxSize) {
  inner.set("desiredSize", getDesiredSize(layout, maxSize));
  inner.set("availableSize", getAvailableSize(inner, maxSize));
  inner.set("availableSizeNoBorder", getAvailableSizeNoBorder(layout, inner));
  inner.set("childMaxExtendedLength", getChildMaxExtendedLength(inner));
};

const getDesiredSize = (layout, maxSize) =>
  measure.desiredSize(layout.get("size"), maxSize);

const getAvailableSize = (inner, maxSize) =>
  measure.availableSize(inner.get("desiredSize"), maxSize);

const getAvailableSizeNoBorder = (layout, inner) => ({
  width: inner.get("availableSize").width - layout.get("border").size * 2,
  height: inner.get("availableSize").height - layout.get("border").size * 2,
});

const getChildMaxExtendedLength = (inner) =>
  inner.get("horizontal")
    ? inner.get("availableSizeNoBorder").width
    : inner.get("availableSizeNoBorder").height;
