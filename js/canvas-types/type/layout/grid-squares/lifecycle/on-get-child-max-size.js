export const onGetChildMaxSize = function (layout, inner, child) {
  return getChildMaxSize(layout, inner, child);
};

const getChildMaxSize = function (layout, inner, child) {
  const { rows, columns } = layout.get("dimensions");
  const squareSize = inner.get("squareSize");
  const { row, column } = child.layoutParams.get("position");
  return {
    width: (columns - column) * squareSize,
    height: (rows - row) * squareSize,
  };
};
