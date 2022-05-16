import { measure } from "../../../../../utils/measure.js";

export const setupMeasureLifecycleFunctions = function (grid) {
  grid.lifecycle.set("onMeasure", function (grid, maxSize) {
    const desiredSize = measure.desiredSize(grid.get("size"), maxSize);
    grid.inner.set("desiredSize", desiredSize);

    const availableSize = measure.availableSize(desiredSize, maxSize);
    grid.inner.set("availableSize", availableSize);

    const availableContentSize = {
      width: availableSize.width - grid.get("border").size * 2,
      height: availableSize.height - grid.get("border").size * 2,
    };
    grid.inner.set("availableContentSize", availableContentSize);

    const columnsWidths = grid.inner.call("getColumnsWidths");
    grid.inner.set("columnsWidths", columnsWidths);

    const rowsHeights = grid.inner.call("getRowsHeights");
    grid.inner.set("rowsHeights", rowsHeights);

    const gridSize = grid.inner.call("getGridSize");
    grid.inner.set("gridSize", gridSize);
  });

  grid.inner.fun("getColumnsWidths", function (grid) {
    const positions = grid.get("dimensions").columns;
    const availableContentLength = grid.inner.get("availableContentSize").width;
    const gap = grid.get("gap").size.horizontal;
    return grid.inner.call(
      "getPositionsLengths",
      positions,
      availableContentLength,
      gap
    );
  });

  grid.inner.fun("getRowsHeights", function (grid) {
    const positions = grid.get("dimensions").rows;
    const availableContentLength = grid.inner.get(
      "availableContentSize"
    ).height;
    const gap = grid.get("gap").size.vertical;
    return grid.inner.call(
      "getPositionsLengths",
      positions,
      availableContentLength,
      gap
    );
  });

  grid.inner.fun(
    "getPositionsLengths",
    function (grid, positions, availableContentLength, gap) {
      const numPositions = positions.reduce((acc, pos) => pos.count + acc, 0);
      if (numPositions === 0) return [];
      let availableLength = availableContentLength - gap * (numPositions - 1);
      if (availableLength < 0) availableLength = 0;
      const pxSum = positions.reduce(
        (acc, pos) => (pos.unit === "px" ? acc + pos.count * pos.value : acc),
        0
      );
      const frSum = positions.reduce(
        (acc, pos) => (pos.unit === "fr" ? acc + pos.count * pos.value : acc),
        0
      );
      const pxLength = pxSum < availableLength ? pxSum : availableLength;
      const fr = (availableLength - pxLength) / frSum;

      const lengths = [];
      let remainingLength = availableLength;
      for (let i = 0; i < positions.length; i++) {
        const { count, unit, value } = positions[i];
        for (let j = 0; j < count; j++) {
          let length;
          if (unit === "px")
            length = value < remainingLength ? value : remainingLength;
          else length = fr * value;
          lengths.push(length);
          remainingLength -= length;
        }
      }

      return lengths;
    }
  );

  grid.inner.fun("getGridSize", function (grid) {
    const numColumns = grid.inner.get("numColumns");
    const numRows = grid.inner.get("numRows");
    const columnsWidths = grid.inner.get("columnsWidths");
    const rowsHeights = grid.inner.get("rowsHeights");
    const sumColumnWidths = columnsWidths.reduce((acc, val) => acc + val, 0);
    const sumRowHeights = rowsHeights.reduce((acc, val) => acc + val, 0);
    const gapHorizontal = grid.get("gap").size.horizontal;
    const gapVertical = grid.get("gap").size.vertical;
    const width = sumColumnWidths + gapHorizontal * (numColumns - 1);
    const height = sumRowHeights + gapVertical * (numRows - 1);
    return { width, height };
  });

  grid.lifecycle.set("getChildMaxSize", function (grid, maxSize, child) {
    const gap = grid.get("gap").size;
    const columnsWidths = grid.inner.get("columnsWidths");
    const rowsHeights = grid.inner.get("rowsHeights");
    const position = child.layoutParams.get("position");
    const span = child.layoutParams.get("span");
    const margin = child.layoutParams.get("margin");

    const valid = grid.inner.call("areChildCellsValid", child);
    if (!valid) return { width: 0, height: 0 };

    const width =
      columnsWidths
        .slice(position.column, position.column + span.columns)
        .reduce((acc, val) => acc + val + gap.horizontal, 0) -
      gap.horizontal -
      (margin.left + margin.right);

    const height =
      rowsHeights
        .slice(position.row, position.row + span.rows)
        .reduce((acc, val) => acc + val + gap.vertical, 0) -
      gap.vertical -
      (margin.top + margin.bottom);

    return { width, height };
  });

  grid.lifecycle.set("getSize", function (grid, maxSize) {
    const size = measure.size(grid.inner.get("desiredSize"), maxSize, {
      width: () =>
        grid.inner.get("gridSize").width + grid.get("border").size * 2,
      height: () =>
        grid.inner.get("gridSize").height + grid.get("border").size * 2,
    });
    const contentSize = {
      width: size.width - grid.get("border").size * 2,
      height: size.height - grid.get("border").size * 2,
    };
    grid.inner.set("contentSize", contentSize);
    return size;
  });
};
