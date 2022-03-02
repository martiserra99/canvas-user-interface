import * as compute from "../../../../utils/compute.js";

export const onLocate = function (layout, inner, coords) {
  inner.set("coordsNoBorder", getCoordsNoBorder(layout, coords));
  inner.set("contentCoords", getContentCoords(layout, inner));
  inner.set("columnCoords", getColumnCoords(layout, inner));
  inner.set("rowCoords", getRowCoords(layout, inner));
  inner.set("childsCellCoords", getChildsCellCoords(layout, inner));
};

const getCoordsNoBorder = (layout, coords) => ({
  x: coords.x + layout.get("border").size,
  y: coords.y + layout.get("border").size,
});

const getContentCoords = (layout, inner) => ({
  x: getContentX(layout, inner),
  y: getContentY(layout, inner),
});

const getContentX = function (layout, inner) {
  const horizontal = layout.get("gravityContent").horizontal;
  let align = "start";
  if (horizontal === "middle") align = "middle";
  else if (horizontal === "right") align = "end";

  const startCoord = inner.get("coordsNoBorder").x;
  const endCoord = startCoord + inner.get("sizeNoBorder").width;
  const coords = { start: startCoord, end: endCoord };

  const length = inner.get("contentSize").width;

  const margin = { start: 0, end: 0 };

  return compute.computeCoordToAlign(align, coords, length, margin);
};

const getContentY = function (layout, inner) {
  const vertical = layout.get("gravityContent").vertical;
  let align = "start";
  if (vertical === "middle") align = "middle";
  else if (vertical === "bottom") align = "end";

  const startCoord = inner.get("coordsNoBorder").y;
  const endCoord = startCoord + inner.get("sizeNoBorder").height;
  const coords = { start: startCoord, end: endCoord };

  const length = inner.get("contentSize").height;

  const margin = { start: 0, end: 0 };

  return compute.computeCoordToAlign(align, coords, length, margin);
};

const getColumnCoords = (layout, inner) =>
  getPositionCoords(
    inner.get("contentCoords").x,
    inner.get("columnWidths"),
    layout.get("gap").horizontal
  );

const getRowCoords = (layout, inner) =>
  getPositionCoords(
    inner.get("contentCoords").y,
    inner.get("rowHeights"),
    layout.get("gap").vertical
  );

const getPositionCoords = function (contentCoord, lengths, gap) {
  const coords = [];
  let coord = contentCoord;
  for (const length of lengths) {
    coords.push(coord);
    coord += length + gap;
  }
  return coords;
};

const getChildsCellCoords = function (layout, inner) {
  const childPositions = inner.get("childPositions");
  const columnCoords = inner.get("columnCoords");
  const rowCoords = inner.get("rowCoords");

  const childsCellCoords = new Map();
  for (const child of layout.childs) {
    const childPosition = childPositions.get(child);
    const childCellCoords = getChildCellCoords(
      childPosition,
      columnCoords,
      rowCoords
    );
    childsCellCoords.set(child, childCellCoords);
  }

  return childsCellCoords;
};

const getChildCellCoords = function (childPosition, columnCoords, rowCoords) {
  if (childPosition === null) return { x: 0, y: 0 };
  const { column, row } = childPosition.position;
  const childCellCoords = {
    x: columnCoords[column],
    y: rowCoords[row],
  };
  return childCellCoords;
};
