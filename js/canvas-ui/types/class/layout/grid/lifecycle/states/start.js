export const setupStartLifecycleFunctions = function (grid) {
  grid.lifecycle.set("onStart", function (grid) {
    const dimensions = grid.get("dimensions");
    const columns = dimensions.columns;
    const rows = dimensions.rows;
    const numColumns = columns.reduce((acc, column) => acc + column.count, 0);
    grid.inner.set("numColumns", numColumns);
    const numRows = rows.reduce((acc, row) => acc + row.count, 0);
    grid.inner.set("numRows", numRows);
  });
};
