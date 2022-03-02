export const onGetChildMaxSize = function (layout, inner, maxSize, child) {
  return getChildMaxSize(inner, child);
};

const getChildMaxSize = function (inner, child) {
  const cellSize = inner.get("childCellSizes").get(child);
  const margin = child.layoutParams.get("margin");
  return {
    width: cellSize.width - margin.left - margin.right,
    height: cellSize.height - margin.top - margin.bottom,
  };
};
