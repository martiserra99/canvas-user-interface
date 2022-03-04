export const onMeasure = function (layout, inner, maxSize) {
  inner.set("squareSize", getSquareSize(layout, inner, maxSize));
  inner.set("size", getSize(layout, inner, maxSize));
};

const getSquareSize = function (layout, inner, maxSize) {
  const { rows, columns } = layout.get("dimensions");
  let { size } = layout.get("squares");
  if (size * rows > maxSize.height) size = maxSize.height / rows;
  if (size * columns > maxSize.width) size = maxSize.width / columns;
  return size;
};

const getSize = function (layout, inner, maxSize) {
  const { rows, columns } = layout.get("dimensions");
  const squareSize = inner.get("squareSize");
  return { width: squareSize * columns, height: squareSize * rows };
};
