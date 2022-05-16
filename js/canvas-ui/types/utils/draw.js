export const draw = {
  area(ctx, coords, size, background, border, corner) {
    const x = coords.x + border.size / 2;
    const y = coords.y + border.size / 2;
    const rectangleCoords = { x, y };

    const width = size.width - border.size;
    const height = size.height - border.size;
    const rectangleSize = { width: width, height };

    let cornerSize = corner.size;
    if (corner.size > width / 2) cornerSize = width / 2;
    if (corner.size > height / 2) cornerSize = height / 2;
    if (cornerSize < 0) cornerSize = 0;
    const rectangleCorner = { type: corner.type, size: cornerSize };

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = background;
    ctx.strokeStyle = border.color;
    ctx.lineWidth = border.size;
    this._areaPath(ctx, rectangleCoords, rectangleSize, rectangleCorner);
    ctx.fill();
    if (border.size > 0) ctx.stroke();
    ctx.restore();
  },

  _areaPath(ctx, coords, size, corner) {
    ctx.moveTo(coords.x, coords.y + size.height - corner.size);
    this._leftEdgePath(ctx, coords, size, corner);
    this._topLeftCornerPath(ctx, coords, size, corner);
    this._topEdgePath(ctx, coords, size, corner);
    this._topRightCornerPath(ctx, coords, size, corner);
    this._rightEdgePath(ctx, coords, size, corner);
    this._bottomRightCornerPath(ctx, coords, size, corner);
    this._bottomEdgePath(ctx, coords, size, corner);
    this._bottomLeftCornerPath(ctx, coords, size, corner);
    ctx.closePath();
  },

  _leftEdgePath(ctx, coords, size, corner) {
    ctx.lineTo(coords.x, coords.y + corner.size);
  },

  _topLeftCornerPath(ctx, coords, size, corner) {
    const start = { x: coords.x, y: coords.y + corner.size };
    const end = { x: coords.x + corner.size, y: coords.y };
    if (corner.type === "round")
      ctx.arcTo(start.x, start.y - corner.size, end.x, end.y, corner.size);
    else ctx.lineTo(end.x, end.y);
  },

  _topEdgePath(ctx, coords, size, corner) {
    ctx.lineTo(coords.x + size.width - corner.size, coords.y);
  },

  _topRightCornerPath(ctx, coords, size, corner) {
    const start = { x: coords.x + size.width - corner.size, y: coords.y };
    const end = { x: coords.x + size.width, y: coords.y + corner.size };
    if (corner.type === "round")
      ctx.arcTo(start.x + corner.size, start.y, end.x, end.y, corner.size);
    else ctx.lineTo(end.x, end.y);
  },

  _rightEdgePath(ctx, coords, size, corner) {
    ctx.lineTo(coords.x + size.width, coords.y + size.height - corner.size);
  },

  _bottomRightCornerPath(ctx, coords, size, corner) {
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
  },

  _bottomEdgePath(ctx, coords, size, corner) {
    ctx.lineTo(coords.x + corner.size, coords.y + size.height);
  },

  _bottomLeftCornerPath(ctx, coords, size, corner) {
    const start = {
      x: coords.x + corner.size,
      y: coords.y + size.height,
    };
    const end = { x: coords.x, y: coords.y + size.height - corner.size };
    if (corner.type === "round")
      ctx.arcTo(start.x - corner.size, start.y, end.x, end.y, corner.size);
    else ctx.lineTo(end.x, end.y);
  },

  rectangle(ctx, coords, size, background) {
    const { x, y } = coords;
    const { width, height } = size;
    ctx.save();
    ctx.fillStyle = background;
    ctx.fillRect(x, y, width, height);
    ctx.restore();
  },

  text(ctx, clipCoords, clipSize, textCoords, text, font, color) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(clipCoords.x, clipCoords.y, clipSize.width, clipSize.height);
    ctx.clip();
    ctx.font = `${font.weight} ${font.size}px ${font.family}`;
    ctx.fillStyle = color;
    ctx.textBaseline = "top";
    ctx.fillText(text, textCoords.x, textCoords.y);
    ctx.restore();
  },

  image(ctx, coords, size, image) {
    const { x, y } = coords;
    const { width, height } = size;
    ctx.drawImage(image, x, y, width, height);
  },
};
