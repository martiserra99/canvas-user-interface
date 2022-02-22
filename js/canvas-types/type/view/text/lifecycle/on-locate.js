import * as compute from "../../../../utils/compute.js";

export const onLocate = function (view, inner, coords) {
  inner.set("textCoords", getTextCoords(view, inner, coords));
};

const getTextCoords = (view, inner, coords) => ({
  x: getTextX(view, inner, coords),
  y: getTextY(view, inner, coords),
});

const getTextX = function (view, inner, coords) {
  const horizontal = view.get("align").horizontal;
  let textAlign = "start";
  if (horizontal === "middle") textAlign = "middle";
  else if (horizontal === "right") textAlign = "end";

  const startCoord = coords.x;
  const endCoord = startCoord + view.size.width;
  const textCoords = { start: startCoord, end: endCoord };

  const textLength = inner.get("textSize").width;

  const textMargin = { start: 0, end: 0 };

  return compute.computeCoordToAlign(
    textAlign,
    textCoords,
    textLength,
    textMargin
  );
};

const getTextY = function (view, inner, coords) {
  const vertical = view.get("align").vertical;
  let textAlign = "start";
  if (vertical === "middle") textAlign = "middle";
  else if (vertical === "bottom") textAlign = "end";

  const startCoord = coords.y;
  const endCoord = startCoord + view.size.height;
  const textCoords = { start: startCoord, end: endCoord };

  const textLength = inner.get("textSize").height;

  const textMargin = { start: 0, end: 0 };

  return compute.computeCoordToAlign(
    textAlign,
    textCoords,
    textLength,
    textMargin
  );
};
