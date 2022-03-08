import * as draw from "../../../../utils/draw.js";

export const onDrawItself = function (layout, inner, ctx) {
  drawArea(layout, ctx);
  drawLines(layout, inner, ctx);
};

const drawArea = function (layout, ctx) {
  const coords = layout.coords;
  const size = layout.size;
  const lines = layout.get("lines");
  const background = layout.get("background");

  const border = {
    color: lines.color,
    size: lines.outside ? lines.size : 0,
  };
  const corner = { type: "cut", size: 0 };

  draw.drawArea(ctx, coords, size, background, border, corner);
};

const drawLines = function (layout, inner, ctx) {
  const coords = layout.coords;
  const size = layout.size;
  const lines = layout.get("lines");

  const { rows, columns } = layout.get("dimensions");
  const squareSize = inner.get("squareSize");

  for (let row = 1; row < rows; row++) {
    const start = { x: coords.x, y: coords.y + row * squareSize };
    const end = { x: coords.x + size.height, y: coords.y + row * squareSize };
    drawLine(ctx, start, end, lines.size, lines.color);
  }

  for (let column = 1; column < columns; column++) {
    const start = { x: coords.x + column * squareSize, y: coords.y };
    const end = { x: coords.x + column * squareSize, y: coords.y + size.width };
    drawLine(ctx, start, end, lines.size, lines.color);
  }
};

const drawLine = function (ctx, start, end, size, color) {
  ctx.save();
  ctx.lineCap = "butt";
  ctx.lineWidth = size;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.restore();
};
