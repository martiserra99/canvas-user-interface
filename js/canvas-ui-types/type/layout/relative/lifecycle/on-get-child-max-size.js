import {
  getChildMaxTop,
  getChildMaxBottom,
  getChildMaxRight,
  getChildMaxLeft,
} from "../utils/utils.js";

export const onGetChildMaxSize = function (layout, inner, maxSize, child) {
  return getChildMaxSize(layout, inner, child);
};

const getChildMaxSize = function (layout, inner, child) {
  if (inner.get("incorrectChilds").includes(child))
    return { width: 0, height: 0 };
  const maxExtendedSize = getChildMaxExtendedSize(layout, inner, child);
  const margin = child.layoutParams.get("margin");
  return {
    width: maxExtendedSize.width - margin.left - margin.right,
    height: maxExtendedSize.height - margin.top - margin.bottom,
  };
};

const getChildMaxExtendedSize = (layout, inner, child) => ({
  width: getChildMaxExtendedWidth(layout, inner, child),
  height: getChildMaxExtendedHeight(layout, inner, child),
});

const getChildMaxExtendedWidth = (layout, inner, child) =>
  getChildMaxRight(layout, inner, child) -
  getChildMaxLeft(layout, inner, child);

const getChildMaxExtendedHeight = (layout, inner, child) =>
  getChildMaxBottom(layout, inner, child) -
  getChildMaxTop(layout, inner, child);
