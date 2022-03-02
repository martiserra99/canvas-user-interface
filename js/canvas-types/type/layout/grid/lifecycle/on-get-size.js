import * as compute from "../../../../utils/compute.js";

export const onGetSize = function (layout, inner, maxSize) {
  inner.set("size", getSize(inner, maxSize));
  inner.set("sizeNoBorder", getSizeNoBorder(layout, inner));
  return inner.get("size");
};

const getSize = (inner, maxSize) =>
  compute.computeSize(inner.get("desiredSize"), maxSize, {
    width: () => inner.get("contentSize").width,
    height: () => inner.get("contentSize").height,
  });

const getSizeNoBorder = (layout, inner) => ({
  width: inner.get("size").width - layout.get("border").size * 2,
  height: inner.get("size").height - layout.get("border").size * 2,
});
