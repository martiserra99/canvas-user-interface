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
  const [defined, auto] = getChildsSplittedByPosition(layout.childs);
  addChildsPositionDefined(numColumns, numRows, positions, defined);
  addChildsPositionAuto(numColumns, numRows, positions, auto);
  return positions;
};

const getChildsSplittedByPosition = function (childs) {
  const positionDefined = [];
  const positionAuto = [];
  for (const child of childs) {
    const position = child.layoutParams.get("position");
    if (position !== "auto") positionDefined.push(child);
    else positionAuto.push(child);
  }
  return [positionDefined, positionAuto];
};

const addChildsPositionDefined = function (
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
    const canAdd = canAddChild(
      numColumns,
      numRows,
      childPositions,
      childPosition
    );
    if (canAdd) childPositions.set(child, childPosition);
    else childPositions.set(child, null);
  }
};

const addChildsPositionAuto = function (
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

        const canAdd = canAddChild(
          numColumns,
          numRows,
          childPositions,
          childPosition
        );

        if (canAdd) {
          childPositions.set(child, childPosition);
          added = true;
        }
        column++;
      }
      row++;
    }

    if (!added) childPositions.set(child, null);
  }
};

const canAddChild = function (
  numColumns,
  numRows,
  childPositions,
  newChildPosition
) {
  const newChildEdges = getChildEdges(newChildPosition);
  if (!areChildEdgesValid(numColumns, numRows, newChildEdges)) return false;
  return [...childPositions.values()].every((childPosition) => {
    if (childPosition === null) return true;
    const childEdges = getChildEdges(childPosition);
    return !areChildEdgesColliding(childEdges, newChildEdges);
  });
};

const getChildEdges = function (childPosition) {
  const { position, span } = childPosition;
  const left = position.column;
  const right = position.column + span.columns - 1;
  const top = position.row;
  const bottom = position.row + span.rows - 1;
  return { left, right, top, bottom };
};

const areChildEdgesValid = (numColumns, numRows, childEdges) =>
  childEdges.left >= 0 &&
  childEdges.top >= 0 &&
  childEdges.right < numColumns &&
  childEdges.bottom < numRows;

const areChildEdgesColliding = (firstChildEdges, secondChildEdges) =>
  firstChildEdges.right >= secondChildEdges.left &&
  firstChildEdges.left <= secondChildEdges.right &&
  firstChildEdges.bottom >= secondChildEdges.top &&
  firstChildEdges.top <= secondChildEdges.bottom;
