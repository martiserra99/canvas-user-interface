import * as compute from "../../../../utils/compute.js";

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
      const align = layout.get("gravityContent");

      const startCoord = inner.get("coordsNoBorder").x;
      const endCoord = startCoord + inner.get("sizeNoBorder").width;
      const coords = { start: startCoord, end: endCoord };

      const length = inner.get("contentSize").width;

      return (
        compute.computeCoordToAlign(align, coords, length) +
        child.layoutParams.get("margin").left
      );
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

  const alignItems = layout.get("alignItems");
  const alignSelf = child.layoutParams.get("alignSelf");
  const align = alignSelf === "auto" ? alignItems : alignSelf;

  const startCoord = inner.get("coordsNoBorder").x;
  const endCoord = startCoord + inner.get("sizeNoBorder").width;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.width;

  const marginStart = child.layoutParams.get("margin").left;
  const marginEnd = child.layoutParams.get("margin").right;
  const margin = { start: marginStart, end: marginEnd };

  return compute.computeCoordToAlign(align, coords, length, margin);
};

const getChildY = function (layout, inner, child, childsWithCoords) {
  if (!inner.get("horizontal")) {
    if (childsWithCoords.length === 0) {
      const align = layout.get("gravityContent");

      const startCoord = inner.get("coordsNoBorder").y;
      const endCoord = startCoord + inner.get("sizeNoBorder").height;
      const coords = { start: startCoord, end: endCoord };

      const length = inner.get("contentSize").height;

      return (
        compute.computeCoordToAlign(align, coords, length) +
        child.layoutParams.get("margin").top
      );
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

  const alignItems = layout.get("alignItems");
  const alignSelf = child.layoutParams.get("alignSelf");
  const align = alignSelf === "auto" ? alignItems : alignSelf;

  const startCoord = inner.get("coordsNoBorder").y;
  const endCoord = startCoord + inner.get("sizeNoBorder").height;
  const coords = { start: startCoord, end: endCoord };

  const length = child.size.height;

  const marginStart = child.layoutParams.get("margin").top;
  const marginEnd = child.layoutParams.get("margin").bottom;
  const margin = { start: marginStart, end: marginEnd };

  return compute.computeCoordToAlign(align, coords, length, margin);
};
