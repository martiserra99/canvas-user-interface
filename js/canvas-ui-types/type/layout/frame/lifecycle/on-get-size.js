import { measure } from "../../../../utils/measure.js";

export const onGetSize = function (layout, inner, maxSize) {
  inner.set("size", getSize(layout, inner, maxSize));
  inner.set("sizeNoBorder", getSizeNoBorder(layout, inner));
  return inner.get("size");
};

const getSize = function (layout, inner, maxSize) {
  const computeSize = {
    width: () => childsMaxExtendedWidth(layout) + layout.get("border").size * 2,
    height: () =>
      childsMaxExtendedHeight(layout) + layout.get("border").size * 2,
  };
  return measure.size(inner.get("desiredSize"), maxSize, computeSize);
};

const childsMaxExtendedWidth = function (layout) {
  return layout.childs.reduce((acc, child) => {
    const margin = child.layoutParams.get("margin");
    const length = child.size.width + margin.left + margin.right;
    return acc > length ? acc : length;
  }, 0);
};

const childsMaxExtendedHeight = function (layout) {
  return layout.childs.reduce((acc, child) => {
    const margin = child.layoutParams.get("margin");
    const length = child.size.height + margin.top + margin.bottom;
    return acc > length ? acc : length;
  }, 0);
};

const getSizeNoBorder = (layout, inner) => ({
  width: inner.get("size").width - layout.get("border").size * 2,
  height: inner.get("size").height - layout.get("border").size * 2,
});
