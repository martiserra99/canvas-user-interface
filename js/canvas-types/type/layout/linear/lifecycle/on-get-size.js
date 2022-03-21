import { measure } from "../../../../utils/measure.js";

export const onGetSize = function (layout, inner, maxSize) {
  inner.set("contentSize", getContentSize(layout, inner));
  inner.set("size", getSize(layout, inner, maxSize));
  inner.set("sizeNoBorder", getSizeNoBorder(layout, inner));
  return inner.get("size");
};

const getContentSize = (layout, inner) => ({
  width: getContentWidth(layout, inner),
  height: getContentHeight(layout, inner),
});

const getContentWidth = function (layout, inner) {
  if (!inner.get("horizontal")) return childsMaxExtendedWidth(layout);
  let width = childsSumExtendedWidths(layout);
  if (layout.childs.length > 0)
    width += layout.get("gap") * (layout.childs.length - 1);
  return width;
};

const childsMaxExtendedWidth = function (layout) {
  return layout.childs.reduce((acc, child) => {
    const margin = child.layoutParams.get("margin");
    const length = child.size.width + margin.left + margin.right;
    return acc > length ? acc : length;
  }, 0);
};

const childsSumExtendedWidths = function (layout) {
  return layout.childs.reduce((acc, child) => {
    const margin = child.layoutParams.get("margin");
    const length = child.size.width + margin.left + margin.right;
    return acc + length;
  }, 0);
};

const getContentHeight = function (layout, inner) {
  if (inner.get("horizontal")) return childsMaxExtendedHeight(layout);
  let height = childsSumExtendedHeights(layout);
  if (layout.childs.length > 0)
    height += layout.get("gap") * (layout.childs.length - 1);
  return height;
};

const childsMaxExtendedHeight = function (layout) {
  return layout.childs.reduce((acc, child) => {
    const margin = child.layoutParams.get("margin");
    const length = child.size.height + margin.top + margin.bottom;
    return acc > length ? acc : length;
  }, 0);
};

const childsSumExtendedHeights = function (layout) {
  return layout.childs.reduce((acc, child) => {
    const margin = child.layoutParams.get("margin");
    const length = child.size.height + margin.top + margin.bottom;
    return acc + length;
  }, 0);
};

const getSize = function (layout, inner, maxSize) {
  const computeSize = {
    width: () => inner.get("contentSize").width + layout.get("border").size * 2,
    height: () =>
      inner.get("contentSize").height + layout.get("border").size * 2,
  };
  return measure.size(inner.get("desiredSize"), maxSize, computeSize);
};

const getSizeNoBorder = (layout, inner) => ({
  width: inner.get("size").width - layout.get("border").size * 2,
  height: inner.get("size").height - layout.get("border").size * 2,
});
