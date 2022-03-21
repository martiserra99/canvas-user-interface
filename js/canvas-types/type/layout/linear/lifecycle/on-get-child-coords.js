import { locate } from "../../../../utils/locate.js";

export const onGetChildCoords = function (
  layout,
  inner,
  coords,
  child,
  childsWithCoords
) {
  return getChildCoords(layout, inner, child, childsWithCoords);
};

const getChildCoords = (layout, inner, child, childsWithCoords) => ({
  x: getChildX(layout, inner, child, childsWithCoords),
  y: getChildY(layout, inner, child, childsWithCoords),
});

const getChildX = function (layout, inner, child, childsWithCoords) {
  if (inner.get("horizontal")) {
    if (childsWithCoords.length === 0) {
      const startCoord = inner.get("coordsNoBorder").x;
      const endCoord = startCoord + inner.get("sizeNoBorder").width;
      const coords = { start: startCoord, end: endCoord };

      const length = inner.get("contentSize").width;

      const align = layout.get("gravityContent");
      const left = child.layoutParams.get("margin").left;

      if (align === "start") return locate.alignStart(coords, length) + left;
      else if (align === "middle")
        return locate.alignMiddle(coords, length) + left;
      else return locate.alignEnd(coords, length) + left;
    }

    const lastChild = childsWithCoords[childsWithCoords.length - 1];
    return (
      lastChild.coords.x +
      lastChild.size.width +
      lastChild.layoutParams.get("margin").right +
      layout.get("gap") +
      child.layoutParams.get("margin").left
    );
  }

  const startCoord = inner.get("coordsNoBorder").x;
  const endCoord = startCoord + inner.get("sizeNoBorder").width;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.width;

  const marginStart = child.layoutParams.get("margin").left;
  const marginEnd = child.layoutParams.get("margin").right;
  const margin = { start: marginStart, end: marginEnd };

  const alignItems = layout.get("alignItems");
  const alignSelf = child.layoutParams.get("alignSelf");
  const align = alignSelf === "auto" ? alignItems : alignSelf;

  if (align === "start") return locate.alignStart(coords, length, margin);
  else if (align === "middle")
    return locate.alignMiddle(coords, length, margin);
  else return locate.alignEnd(coords, length, margin);
};

const getChildY = function (layout, inner, child, childsWithCoords) {
  if (!inner.get("horizontal")) {
    if (childsWithCoords.length === 0) {
      const startCoord = inner.get("coordsNoBorder").y;
      const endCoord = startCoord + inner.get("sizeNoBorder").height;
      const coords = { start: startCoord, end: endCoord };

      const length = inner.get("contentSize").height;

      const align = layout.get("gravityContent");
      const top = child.layoutParams.get("margin").top;

      if (align === "start") return locate.alignStart(coords, length) + top;
      else if (align === "middle")
        return locate.alignMiddle(coords, length) + top;
      else return locate.alignEnd(coords, length) + top;
    }

    const lastChild = childsWithCoords[childsWithCoords.length - 1];
    return (
      lastChild.coords.y +
      lastChild.size.height +
      lastChild.layoutParams.get("margin").bottom +
      layout.get("gap") +
      child.layoutParams.get("margin").top
    );
  }

  const startCoord = inner.get("coordsNoBorder").y;
  const endCoord = startCoord + inner.get("sizeNoBorder").height;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.height;

  const marginStart = child.layoutParams.get("margin").top;
  const marginEnd = child.layoutParams.get("margin").bottom;
  const margin = { start: marginStart, end: marginEnd };

  const alignItems = layout.get("alignItems");
  const alignSelf = child.layoutParams.get("alignSelf");
  const align = alignSelf === "auto" ? alignItems : alignSelf;

  if (align === "start") return locate.alignStart(coords, length, margin);
  else if (align === "middle")
    return locate.alignMiddle(coords, length, margin);
  else return locate.alignEnd(coords, length, margin);
};
