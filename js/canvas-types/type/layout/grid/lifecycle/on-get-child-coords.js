import * as compute from "../../../../utils/compute.js";

export const onGetChildCoords = function (layout, inner, child) {
  return getChildCoords(layout, inner, child);
};

const getChildCoords = (layout, inner, child) => ({
  x: getChildX(layout, inner, child),
  y: getChildY(layout, inner, child),
});

const getChildX = function (layout, inner, child) {
  const horizontalItems = layout.get("alignItems").horizontal;
  const horizontalSelf = child.layoutParams.get("alignSelf").horizontal;
  const horizontal =
    horizontalSelf === "auto" ? horizontalItems : horizontalSelf;
  let align = "start";
  if (horizontal === "middle") align = "middle";
  else if (horizontal === "right") align = "end";

  const startCoord = inner.get("childsCellCoords").get(child).x;
  const endCoord = startCoord + inner.get("childCellSizes").get(child).width;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.width;

  const marginStart = child.layoutParams.get("margin").left;
  const marginEnd = child.layoutParams.get("margin").right;
  const margin = { start: marginStart, end: marginEnd };

  return compute.computeCoordToAlign(align, coords, length, margin);
};

function getChildY(layout, inner, child) {
  const verticalItems = layout.get("alignItems").vertical;
  const verticalSelf = child.layoutParams.get("alignSelf").vertical;
  const vertical = verticalSelf === "auto" ? verticalItems : verticalSelf;
  let align = "start";
  if (vertical === "middle") align = "middle";
  else if (vertical === "right") align = "end";

  const startCoord = inner.get("childsCellCoords").get(child).y;
  const endCoord = startCoord + inner.get("childCellSizes").get(child).height;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.height;

  const marginStart = child.layoutParams.get("margin").top;
  const marginEnd = child.layoutParams.get("margin").bottom;
  const margin = { start: marginStart, end: marginEnd };

  return compute.computeCoordToAlign(align, coords, length, margin);
}
