import { locate } from "../../../../utils/locate.js";

export const onGetChildCoords = function (layout, inner, child) {
  return getChildCoords(layout, inner, child);
};

const getChildCoords = (layout, inner, child) => ({
  x: getChildX(layout, inner, child),
  y: getChildY(layout, inner, child),
});

const getChildX = function (layout, inner, child) {
  const startCoord = inner.get("childsCellCoords").get(child).x;
  const endCoord = startCoord + inner.get("childCellSizes").get(child).width;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.width;

  const marginStart = child.layoutParams.get("margin").left;
  const marginEnd = child.layoutParams.get("margin").right;
  const margin = { start: marginStart, end: marginEnd };

  const alignItems = layout.get("alignItems").horizontal;
  const alignSelf = child.layoutParams.get("alignSelf").horizontal;
  const align = alignSelf === "auto" ? alignItems : alignSelf;

  if (align === "left") return locate.alignStart(coords, length, margin);
  else if (align === "middle")
    return locate.alignMiddle(coords, length, margin);
  else return locate.alignEnd(coords, length, margin);
};

function getChildY(layout, inner, child) {
  const startCoord = inner.get("childsCellCoords").get(child).y;
  const endCoord = startCoord + inner.get("childCellSizes").get(child).height;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.height;

  const marginStart = child.layoutParams.get("margin").top;
  const marginEnd = child.layoutParams.get("margin").bottom;
  const margin = { start: marginStart, end: marginEnd };

  const alignItems = layout.get("alignItems").vertical;
  const alignSelf = child.layoutParams.get("alignSelf").vertical;
  const align = alignSelf === "auto" ? alignItems : alignSelf;

  if (align === "top") return locate.alignStart(coords, length, margin);
  else if (align === "middle")
    return locate.alignMiddle(coords, length, margin);
  else return locate.alignEnd(coords, length, margin);
}
