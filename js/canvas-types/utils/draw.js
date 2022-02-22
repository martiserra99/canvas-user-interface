export const drawRectangle = function (
  ctx,
  coords,
  size,
  background,
  border,
  corner
) {
  const x = coords.x + border.size / 2;
  const y = coords.y + border.size / 2;
  const rectangleCoords = { x, y };

  const width = size.width - border.size;
  const height = size.height - border.size;
  const rectangleSize = { width: width, height };

  let cornerSize = corner.size;
  if (corner.size > width / 2) cornerSize = width / 2;
  if (corner.size > height / 2) cornerSize = height / 2;
  const rectangleCorner = { type: corner.type, size: cornerSize };

  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = background;
  ctx.strokeStyle = border.color;
  ctx.lineWidth = border.size;
  drawRectanglePath(ctx, rectangleCoords, rectangleSize, rectangleCorner);
  ctx.fill();
  if (border.size > 0) ctx.stroke();
  ctx.restore();
};

const drawRectanglePath = function (ctx, coords, size, corner) {
  ctx.moveTo(coords.x, coords.y + size.height - corner.size);
  drawLeftEdgePath(ctx, coords, size, corner);
  drawTopLeftCornerPath(ctx, coords, size, corner);
  drawTopEdgePath(ctx, coords, size, corner);
  drawTopRightCornerPath(ctx, coords, size, corner);
  drawRightEdgePath(ctx, coords, size, corner);
  drawBottomRightCornerPath(ctx, coords, size, corner);
  drawBottomEdgePath(ctx, coords, size, corner);
  drawBottomLeftCornerPath(ctx, coords, size, corner);
  ctx.closePath();
};

const drawLeftEdgePath = function (ctx, coords, size, corner) {
  ctx.lineTo(coords.x, coords.y + corner.size);
};

const drawTopLeftCornerPath = function (ctx, coords, size, corner) {
  const start = { x: coords.x, y: coords.y + corner.size };
  const end = { x: coords.x + corner.size, y: coords.y };
  if (corner.type === "round")
    ctx.arcTo(start.x, start.y - corner.size, end.x, end.y, corner.size);
  else ctx.lineTo(end.x, end.y);
};

const drawTopEdgePath = function (ctx, coords, size, corner) {
  ctx.lineTo(coords.x + size.width - corner.size, coords.y);
};

const drawTopRightCornerPath = function (ctx, coords, size, corner) {
  const start = { x: coords.x + size.width - corner.size, y: coords.y };
  const end = { x: coords.x + size.width, y: coords.y + corner.size };
  if (corner.type === "round")
    ctx.arcTo(start.x + corner.size, start.y, end.x, end.y, corner.size);
  else ctx.lineTo(end.x, end.y);
};

const drawRightEdgePath = function (ctx, coords, size, corner) {
  ctx.lineTo(coords.x + size.width, coords.y + size.height - corner.size);
};

const drawBottomRightCornerPath = function (ctx, coords, size, corner) {
  const start = {
    x: coords.x + size.width,
    y: coords.y + size.height - corner.size,
  };
  const end = {
    x: coords.x + size.width - corner.size,
    y: coords.y + size.height,
  };
  if (corner.type === "round")
    ctx.arcTo(start.x, start.y + corner.size, end.x, end.y, corner.size);
  else ctx.lineTo(end.x, end.y);
};

const drawBottomEdgePath = function (ctx, coords, size, corner) {
  ctx.lineTo(coords.x + corner.size, coords.y + size.height);
};

const drawBottomLeftCornerPath = function (ctx, coords, size, corner) {
  const start = {
    x: coords.x + corner.size,
    y: coords.y + size.height,
  };
  const end = { x: coords.x, y: coords.y + size.height - corner.size };
  if (corner.type === "round")
    ctx.arcTo(start.x - corner.size, start.y, end.x, end.y, corner.size);
  else ctx.lineTo(end.x, end.y);
};

export const drawText = function (
  ctx,
  clipCoords,
  clipSize,
  textCoords,
  text,
  font
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(clipCoords.x, clipCoords.y, clipSize.width, clipSize.height);
  ctx.clip();
  ctx.font = `${font.weight} ${font.size}px ${font.family}`;
  ctx.fillStyle = font.color;
  ctx.textBaseline = "top";
  ctx.fillText(text, textCoords.x, textCoords.y);
  ctx.restore();
};

export const drawImage = function (ctx, coords, size, image) {
  const { x, y } = coords;
  const { width, height } = size;
  ctx.drawImage(image, x, y, width, height);
};
