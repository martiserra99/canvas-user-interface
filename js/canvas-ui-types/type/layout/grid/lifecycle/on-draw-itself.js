import { draw } from "../../../../utils/draw.js";

export const onDrawItself = function (layout, inner, ctx) {
  drawArea(layout, inner, ctx);
  drawGaps(layout, inner, ctx);
};

const drawArea = function (layout, inner, ctx) {
  const coords = layout.coords;
  const size = layout.size;
  const background = layout.get("background");
  const border = layout.get("border");
  const corner = layout.get("corner");
  draw.area(ctx, coords, size, background, border, corner);
};

const drawGaps = function (layout, inner, ctx) {
  drawHorizontalGaps(layout, inner, ctx);
  drawVerticalGaps(layout, inner, ctx);
};

const drawHorizontalGaps = function (layout, inner, ctx) {
  const contentCoords = inner.get("contentCoords");
  const contentSize = inner.get("contentSize");

  const gap = layout.get("gap");
  const gapColor = layout.get("gapColor");
  const rowCoords = inner.get("rowCoords");

  for (let i = 1; i < rowCoords.length; i++) {
    const x = contentCoords.x;
    const y = rowCoords[i] - gap.vertical;
    const coords = { x, y };

    const width = contentSize.width;
    const height = gap.vertical;
    const size = { width, height };
    draw.rectangle(ctx, coords, size, gapColor);
  }
};

const drawVerticalGaps = function (layout, inner, ctx) {
  const contentCoords = inner.get("contentCoords");
  const contentSize = inner.get("contentSize");

  const gap = layout.get("gap");
  const gapColor = layout.get("gapColor");
  const columnCoords = inner.get("columnCoords");

  for (let i = 1; i < columnCoords.length; i++) {
    const x = columnCoords[i] - gap.horizontal;
    const y = contentCoords.y;
    const coords = { x, y };

    const width = gap.horizontal;
    const height = contentSize.height;
    const size = { width, height };

    draw.rectangle(ctx, coords, size, gapColor);
  }
};
