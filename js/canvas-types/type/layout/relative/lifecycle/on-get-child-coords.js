import { getChildTop, getChildLeft } from "../utils/utils.js";

export const onGetChildCoords = function (layout, inner, coords, child) {
  return getChildCoords(layout, inner, coords, child);
};

const getChildCoords = function (layout, inner, coords, child) {
  if (inner.get("incorrectChilds").includes(child)) return { x: 0, y: 0 };
  return {
    x: getChildX(layout, inner, coords, child),
    y: getChildY(layout, inner, coords, child),
  };
};

const getChildX = (layout, inner, coords, child) =>
  getChildLeft(layout, inner, child) + coords.x;

const getChildY = (layout, inner, coords, child) =>
  getChildTop(layout, inner, child) + coords.y;
