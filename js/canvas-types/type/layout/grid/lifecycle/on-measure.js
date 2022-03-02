import * as compute from "../../../../utils/compute.js";

export const onMeasure = function (layout, inner, maxSize) {
  inner.set("desiredSize", getDesiredSize(layout, maxSize));
  inner.set("availableSize", getAvailableSize(inner, maxSize));
  inner.set("availableSizeNoBorder", getAvailableSizeNoBorder(layout, inner));
  inner.set("columnWidths", getColumnWidths(layout, inner));
  inner.set("rowHeights", getRowHeights(layout, inner));
  inner.set("contentSize", getContentSize(layout, inner));
  inner.set("childCellSizes", getChildCellSizes(layout, inner));
};

const getDesiredSize = (layout, maxSize) =>
  compute.computeDesiredSize(layout.get("size"), maxSize);

const getAvailableSize = (inner, maxSize) =>
  compute.computeAvailableSize(inner.get("desiredSize"), maxSize);

const getAvailableSizeNoBorder = (layout, inner) => ({
  width: inner.get("availableSize").width - layout.get("border").size * 2,
  height: inner.get("availableSize").height - layout.get("border").size * 2,
});

const getColumnWidths = function (layout, inner) {
  const columns = layout.get("dimensions").columns;
  const availableWidth = inner.get("availableSizeNoBorder").width;
  const gap = layout.get("gap").horizontal;
  return getPositionLengths(columns, availableWidth, gap);
};

const getRowHeights = function (layout, inner) {
  const rows = layout.get("dimensions").rows;
  const availableHeight = inner.get("availableSizeNoBorder").height;
  const gap = layout.get("gap").vertical;
  return getPositionLengths(rows, availableHeight, gap);
};

const getPositionLengths = function (positions, available, gap) {
  const lengths = [];
  const [lengthsPx, lengthsFr] = getPositionsSplittedByUnit(positions);
  const sumLengthsPx = addPositionLengthsPx(lengths, lengthsPx, available, gap);
  let remaining = available - sumLengthsPx;
  if (lengths.length > 0) remaining -= gap * lengthsPx.length;
  if (remaining < 0) remaining = 0;
  addPositionLengthsFr(lengths, lengthsFr, remaining, gap);
  return lengths;
};

const getPositionsSplittedByUnit = function (positions) {
  const lengthsPx = [],
    lengthsFr = [];
  let index = 0;
  for (const { count, unit, length } of positions) {
    const length = length > 0 ? length : 0;
    if (unit === "px")
      for (let i = 0; i < count; i++) lengthsPx.push([index + i, length]);
    else for (let i = 0; i < count; i++) lengthsFr.push([index + i, length]);
    index += count;
  }
  return [lengthsPx, lengthsFr];
};

const addPositionLengthsPx = function (lengths, lengthsPx, available, gap) {
  if (lengthsPx.length === 0) return 0;
  let sumPx = 0;
  for (const [index, value] of lengthsPx) {
    let remaining = available - sumPx;
    remaining -= gap * index;
    if (remaining < 0) remaining = 0;
    const length = value < remaining ? value : remaining;
    lengths.push(length);
    sumPx += length;
  }
  return sumPx;
};

const addPositionLengthsFr = function (lengths, lengthsFr, available, gap) {
  if (lengthsFr.length === 0) return;
  const sumFr = lengthsFr.reduce((acc, [_, val]) => acc + val, 0);
  const sumLengths = available - gap * (lengthsFr.length - 1);
  const fr = sumFr > 0 ? sumLengths / sumFr : 0;
  for (const [index, value] of lengthsFr) lengths.splice(index, 0, value * fr);
};

const getContentSize = (layout, inner) => ({
  width: getContentWidth(layout, inner),
  height: getContentHeight(layout, inner),
});

const getContentWidth = (layout, inner) =>
  getContentLength(inner.get("columnWidths"), layout.get("gap").horizontal);

const getContentHeight = (layout, inner) =>
  getContentLength(inner.get("rowHeights"), layout.get("gap").vertical);

const getContentLength = function (lengths, gap) {
  const numLengths = lengths.length;
  let contentLength = 0;
  contentLength += lengths.reduce((acc, length) => acc + length, 0);
  if (numLengths > 1) contentLength += gap * (numLengths - 1);
  return contentLength;
};

const getChildCellSizes = function (layout, inner) {
  const childCellSizes = new Map();
  const childPositions = inner.get("childPositions");
  const widths = inner.get("columnWidths");
  const heights = inner.get("rowHeights");
  const gap = layout.get("gap");

  for (const child of layout.childs) {
    const position = childPositions.get(child);
    const childCellSize = getChildCellSize(position, widths, heights, gap);
    childCellSizes.set(child, childCellSize);
  }

  return childCellSizes;
};

const getChildCellSize = (position, widths, heights, gap) => ({
  width: getChildCellWidth(position, widths, gap),
  height: getChildCellHeight(position, heights, gap),
});

const getChildCellWidth = function (childPosition, widths, gap) {
  if (childPosition === null) return 0;
  const position = childPosition.position.column;
  const span = childPosition.span.columns;
  const gapHorizontal = gap.horizontal;
  return getChildCellLength(position, span, widths, gapHorizontal);
};

const getChildCellHeight = function (childPosition, heights, gap) {
  if (childPosition === null) return 0;
  const position = childPosition.position.row;
  const span = childPosition.span.rows;
  const gapVertical = gap.vertical;
  return getChildCellLength(position, span, heights, gapVertical);
};

const getChildCellLength = function (position, span, lengths, gap) {
  let result = 0;
  for (let i = 0; i < span; i++) {
    result += lengths[position + i] + gap;
  }
  result -= gap;
  return result;
};
