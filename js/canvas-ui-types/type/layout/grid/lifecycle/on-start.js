export const onStart = function (layout, inner) {
  inner.set("numColumns", getNumColumns(layout));
  inner.set("numRows", getNumRows(layout));
  inner.set("childPositions", getChildPositions(layout, inner));
};

const getNumColumns = (layout) =>
  getNumPositions(layout.get("dimensions").columns);

const getNumRows = (layout) => getNumPositions(layout.get("dimensions").rows);

const getNumPositions = (positions) =>
  positions.reduce((acc, pos) => acc + pos.count, 0);

const getChildPositions = function (layout, inner) {
  const positions = new Map();
  const numColumns = inner.get("numColumns");
  const numRows = inner.get("numRows");
  const [defined, auto] = splitChildsByPositionType(layout.childs);
  addChildsWithDefinedPosition(numColumns, numRows, positions, defined);
  addChildsWithAutoPosition(numColumns, numRows, positions, auto);
  return positions;
};

const splitChildsByPositionType = function (childs) {
  const defined = [];
  const auto = [];
  for (const child of childs) {
    const position = child.layoutParams.get("position");
    if (position !== "auto") defined.push(child);
    else auto.push(child);
  }
  return [defined, auto];
};

const addChildsWithDefinedPosition = function (
  numColumns,
  numRows,
  childPositions,
  childs
) {
  for (const child of childs) {
    const childPosition = {
      position: child.layoutParams.get("position"),
      span: child.layoutParams.get("span"),
    };
    const isValid = isPositionValid(numColumns, numRows, childPosition);
    if (isValid) childPositions.set(child, childPosition);
    else childPositions.set(child, getDefaultPosition(numRows, numColumns));
  }
};

const addChildsWithAutoPosition = function (
  numColumns,
  numRows,
  childPositions,
  childs
) {
  for (const child of childs) {
    let added = false;
    const span = child.layoutParams.get("span");

    let row = 0;
    while (row < numRows && !added) {
      let column = 0;
      while (column < numColumns && !added) {
        const position = { column, row };
        const childPosition = { position, span };

        const isEmpty = isPositionEmpty(
          numColumns,
          numRows,
          childPositions,
          childPosition
        );

        if (isEmpty) {
          childPositions.set(child, childPosition);
          added = true;
        }
        column++;
      }
      row++;
    }

    if (!added)
      childPositions.set(child, getDefaultPosition(numRows, numColumns));
  }
};

const isPositionEmpty = function (
  numColumns,
  numRows,
  childPositions,
  position
) {
  const edges = getPositionEdges(position);
  if (!arePositionEdgesValid(numColumns, numRows, edges)) return false;
  return [...childPositions.values()].every((childPosition) => {
    if (childPosition === null) return true;
    const childEdges = getPositionEdges(childPosition);
    return !arePositionEdgesColliding(childEdges, edges);
  });
};

const isPositionValid = function (numColumns, numRows, position) {
  const edges = getPositionEdges(position);
  return arePositionEdgesValid(numColumns, numRows, edges);
};

const getPositionEdges = function (childPosition) {
  const { position, span } = childPosition;
  const left = position.column;
  const right = position.column + span.columns - 1;
  const top = position.row;
  const bottom = position.row + span.rows - 1;
  return { left, right, top, bottom };
};

const arePositionEdgesValid = (numColumns, numRows, childEdges) =>
  childEdges.left >= 0 &&
  childEdges.top >= 0 &&
  childEdges.right < numColumns &&
  childEdges.bottom < numRows;

const arePositionEdgesColliding = (firstChildEdges, secondChildEdges) =>
  firstChildEdges.right >= secondChildEdges.left &&
  firstChildEdges.left <= secondChildEdges.right &&
  firstChildEdges.bottom >= secondChildEdges.top &&
  firstChildEdges.top <= secondChildEdges.bottom;

const getDefaultPosition = function (numRows, numColumns) {
  const position = {
    position: { row: 0, column: 0 },
    span: { rows: 1, columns: 1 },
  };
  const valid = isPositionValid(numRows, numColumns, position);
  if (valid) return position;
  return null;
};
