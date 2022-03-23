export const setupUtilsFunctions = function (grid) {
  grid.inner.fun("areChildCellsValid", function (grid, child) {
    const position = child.layoutParams.get("position");
    const span = child.layoutParams.get("span");

    const numColumns = grid.inner.get("numColumns");
    const numRows = grid.inner.get("numRows");

    if (position.column < 0 || position.row < 0) return false;
    if (span.columns < 1 || span.rows < 1) return false;
    if (position.column + span.columns - 1 >= numColumns) return false;
    if (position.row + span.rows - 1 >= numRows) return false;

    return true;
  });
};
