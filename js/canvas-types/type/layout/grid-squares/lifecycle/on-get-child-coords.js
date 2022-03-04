export const onGetChildCoords = function (inner, coords, child) {
  return getChildCoords(inner, coords, child);
};

const getChildCoords = function (inner, coords, child) {
  const squareSize = inner.get("squareSize");
  const { row, column } = child.layoutParams.get("position");
  return {
    x: coords.x + column * squareSize,
    y: coords.y + row * squareSize,
  };
};
