import { locate } from "../../../../../utils/locate.js";

export const setupLocateLifecycleFunctions = function (grid) {
  grid.lifecycle.set("onLocate", function (grid, coords) {
    const contentCoords = {
      x: coords.x + grid.get("border").size,
      y: coords.y + grid.get("border").size,
    };
    grid.inner.set("contentCoords", contentCoords);

    const gridCoords = grid.inner.call("getGridCoords");
    grid.inner.set("gridCoords", gridCoords);

    const columnsCoords = grid.inner.call("getColumnsCoords");
    grid.inner.set("columnsCoords", columnsCoords);

    const rowsCoords = grid.inner.call("getRowsCoords");
    grid.inner.set("rowsCoords", rowsCoords);
  });

  grid.inner.fun("getGridCoords", function (grid) {
    const x = grid.inner.call("getGridX");
    const y = grid.inner.call("getGridY");
    return { x, y };
  });

  grid.inner.fun("getGridX", function (grid) {
    const contentCoords = grid.inner.get("contentCoords");
    const contentSize = grid.inner.get("contentSize");
    const gridSize = grid.inner.get("gridSize");

    const coords = {
      start: contentCoords.x,
      end: contentCoords.x + contentSize.width,
    };
    const length = gridSize.width;
    const align = grid.get("alignContent").horizontal;

    if (align === "left") return locate.alignStart(coords, length);
    else if (align === "middle") return locate.alignMiddle(coords, length);
    else return locate.alignEnd(coords, length);
  });

  grid.inner.fun("getGridY", function (grid) {
    const contentCoords = grid.inner.get("contentCoords");
    const contentSize = grid.inner.get("contentSize");
    const gridSize = grid.inner.get("gridSize");

    const coords = {
      start: contentCoords.y,
      end: contentCoords.y + contentSize.height,
    };
    const length = gridSize.height;
    const align = grid.get("alignContent").vertical;

    if (align === "top") return locate.alignStart(coords, length);
    else if (align === "middle") return locate.alignMiddle(coords, length);
    else return locate.alignEnd(coords, length);
  });

  grid.inner.fun("getColumnsCoords", function (grid) {
    const gridCoord = grid.inner.get("gridCoords").x;
    const positionsLengths = grid.inner.get("columnsWidths");
    const gap = grid.get("gap").size.horizontal;
    return grid.inner.call(
      "getPositionsCoords",
      gridCoord,
      positionsLengths,
      gap
    );
  });

  grid.inner.fun("getRowsCoords", function (grid) {
    const gridCoord = grid.inner.get("gridCoords").y;
    const positionsLengths = grid.inner.get("rowsHeights");
    const gap = grid.get("gap").size.vertical;
    return grid.inner.call(
      "getPositionsCoords",
      gridCoord,
      positionsLengths,
      gap
    );
  });

  grid.inner.fun(
    "getPositionsCoords",
    function (grid, gridCoord, positionsLengths, gap) {
      const coords = [];
      let coord = gridCoord;
      for (const length of positionsLengths) {
        coords.push(coord);
        coord += length + gap;
      }
      return coords;
    }
  );

  grid.lifecycle.set(
    "getChildCoords",
    function (grid, coords, child, childrenWithCoords) {
      const valid = grid.inner.call("areChildCellsValid", child);
      if (!valid) return { x: 0, y: 0 };
      const x = grid.inner.call("getChildX", child);
      const y = grid.inner.call("getChildY", child);
      return { x, y };
    }
  );

  grid.inner.fun("getChildX", function (grid, child) {
    const position = child.layoutParams.get("position").column;
    const span = child.layoutParams.get("span").columns;
    const gap = grid.get("gap").size.horizontal;

    const columnsCoords = grid.inner.get("columnsCoords");
    const columnsWidths = grid.inner.get("columnsWidths");

    const cellsCoord = columnsCoords[position];
    const cellsLength =
      columnsWidths
        .slice(position, position + span)
        .reduce((acc, val) => acc + val + gap, 0) - gap;

    const coords = { start: cellsCoord, end: cellsCoord + cellsLength };
    const length = child.size.width;

    const margin = {
      start: child.layoutParams.get("margin").left,
      end: child.layoutParams.get("margin").right,
    };

    const alignItems = grid.get("alignItems").horizontal;
    const alignSelf = child.layoutParams.get("alignSelf").horizontal;
    const align = alignSelf === "auto" ? alignItems : alignSelf;

    if (align === "left") return locate.alignStart(coords, length, margin);
    else if (align === "middle")
      return locate.alignMiddle(coords, length, margin);
    else return locate.alignEnd(coords, length, margin);
  });

  grid.inner.fun("getChildY", function (grid, child) {
    const position = child.layoutParams.get("position").row;
    const span = child.layoutParams.get("span").rows;
    const gap = grid.get("gap").size.vertical;

    const rowsCoords = grid.inner.get("rowsCoords");
    const rowsHeights = grid.inner.get("rowsHeights");

    const cellsCoord = rowsCoords[position];
    const cellsLength =
      rowsHeights
        .slice(position, position + span)
        .reduce((acc, val) => acc + val + gap, 0) - gap;

    const coords = { start: cellsCoord, end: cellsCoord + cellsLength };
    const length = child.size.height;

    const margin = {
      start: child.layoutParams.get("margin").top,
      end: child.layoutParams.get("margin").bottom,
    };

    const alignItems = grid.get("alignItems").vertical;
    const alignSelf = child.layoutParams.get("alignSelf").vertical;
    const align = alignSelf === "auto" ? alignItems : alignSelf;

    if (align === "left") return locate.alignStart(coords, length, margin);
    else if (align === "middle")
      return locate.alignMiddle(coords, length, margin);
    else return locate.alignEnd(coords, length, margin);
  });
};
