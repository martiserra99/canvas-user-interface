import { locate } from "../../../../utils/locate.js";

export const onLocate = function (view, inner, coords) {
  inner.set("textCoords", getTextCoords(view, inner, coords));
};

const getTextCoords = (view, inner, coords) => ({
  x: getTextX(view, inner, coords),
  y: getTextY(view, inner, coords),
});

const getTextX = function (view, inner, coords) {
  const startCoord = coords.x;
  const endCoord = startCoord + view.size.width;
  const textCoords = { start: startCoord, end: endCoord };

  const textLength = inner.get("textSize").width;

  const align = view.get("align").horizontal;

  if (align === "left") return locate.alignStart(textCoords, textLength);
  else if (align === "middle")
    return locate.alignMiddle(textCoords, textLength);
  else return locate.alignEnd(textCoords, textLength);
};

const getTextY = function (view, inner, coords) {
  const startCoord = coords.y;
  const endCoord = startCoord + view.size.height;
  const textCoords = { start: startCoord, end: endCoord };

  const textLength = inner.get("textSize").height;

  const align = view.get("align").vertical;

  if (align === "top") return locate.alignStart(textCoords, textLength);
  else if (align === "middle")
    return locate.alignMiddle(textCoords, textLength);
  else return locate.alignEnd(textCoords, textLength);
};
