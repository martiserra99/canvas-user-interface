import * as compute from "../../../../utils/compute.js";

export const onGetChildCoords = function (layout, inner, coords, child) {
  return getChildCoords(inner, child);
};

const getChildCoords = (inner, child) => ({
  x: getChildX(inner, child),
  y: getChildY(inner, child),
});

const getChildX = function (inner, child) {
  const horizontal = child.layoutParams.get("gravity").horizontal;
  let align = "start";
  if (horizontal === "middle") align = "middle";
  else if (horizontal === "right") align = "end";

  const startCoord = inner.get("coordsNoBorder").x;
  const endCoord = startCoord + inner.get("sizeNoBorder").width;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.width;

  const marginStart = child.layoutParams.get("margin").left;
  const marginEnd = child.layoutParams.get("margin").right;
  const margin = { start: marginStart, end: marginEnd };

  return compute.computeCoordToAlign(align, coords, length, margin);
};

const getChildY = function (inner, child) {
  const vertical = child.layoutParams.get("gravity").vertical;
  let align = "start";
  if (vertical === "middle") align = "middle";
  else if (vertical === "bottom") align = "end";

  const startCoord = inner.get("coordsNoBorder").y;
  const endCoord = startCoord + inner.get("sizeNoBorder").height;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.height;

  const marginStart = child.layoutParams.get("margin").top;
  const marginEnd = child.layoutParams.get("margin").bottom;
  const margin = { start: marginStart, end: marginEnd };

  return compute.computeCoordToAlign(align, coords, length, margin);
};
