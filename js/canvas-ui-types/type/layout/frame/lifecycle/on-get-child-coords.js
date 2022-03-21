import { locate } from "../../../../utils/locate.js";

export const onGetChildCoords = function (layout, inner, coords, child) {
  return getChildCoords(inner, child);
};

const getChildCoords = (inner, child) => ({
  x: getChildX(inner, child),
  y: getChildY(inner, child),
});

const getChildX = function (inner, child) {
  const startCoord = inner.get("coordsNoBorder").x;
  const endCoord = startCoord + inner.get("sizeNoBorder").width;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.width;

  const marginStart = child.layoutParams.get("margin").left;
  const marginEnd = child.layoutParams.get("margin").right;
  const margin = { start: marginStart, end: marginEnd };

  const align = child.layoutParams.get("align").horizontal;

  if (align === "left") return locate.alignStart(coords, length, margin);
  else if (align === "middle")
    return locate.alignMiddle(coords, length, margin);
  else return locate.alignEnd(coords, length, margin);
};

const getChildY = function (inner, child) {
  const startCoord = inner.get("coordsNoBorder").y;
  const endCoord = startCoord + inner.get("sizeNoBorder").height;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.height;

  const marginStart = child.layoutParams.get("margin").top;
  const marginEnd = child.layoutParams.get("margin").bottom;
  const margin = { start: marginStart, end: marginEnd };

  const align = child.layoutParams.get("align").vertical;

  if (align === "top") return locate.alignStart(coords, length, margin);
  else if (align === "middle")
    return locate.alignMiddle(coords, length, margin);
  else return locate.alignEnd(coords, length, margin);
};
