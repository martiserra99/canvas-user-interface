export const computeLength = function (desiredLength, maxLength, autoLength) {
  let result = desiredLength === null ? autoLength() : desiredLength;
  if (result > maxLength) result = maxLength;
  if (result < 0) result = 0;
  return result;
};

export const computeAvailableLength = function (desiredLength, maxLength) {
  if (desiredLength === null) return maxLength;
  if (desiredLength < maxLength) return desiredLength;
  return maxLength;
};

export const computeDesiredLength = function (length, maxLength) {
  if (length === "auto") return null;
  const { unit, value } = length;
  return unit === "px" ? value : maxLength * (value / 100);
};

export const computeSize = function (desiredSize, maxSize, computeSize) {
  return {
    width: computeLength(desiredSize.width, maxSize.width, computeSize?.width),
    height: computeLength(
      desiredSize.height,
      maxSize.height,
      computeSize?.height
    ),
  };
};

export const computeAvailableSize = function (desiredSize, maxSize) {
  return {
    width: computeAvailableLength(desiredSize.width, maxSize.width),
    height: computeAvailableLength(desiredSize.height, maxSize.height),
  };
};

export const computeDesiredSize = function (size, maxSize) {
  return {
    width: computeDesiredLength(size.width, maxSize.width),
    height: computeDesiredLength(size.height, maxSize.height),
  };
};

export const computeTextSize = function (text, font) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = `${font.weight} ${font.size}px ${font.family}`;
  return { width: ctx.measureText(text).width, height: font.size };
};

export const computeCoordToAlign = function (
  align,
  coords,
  length,
  margin = { start: 0, end: 0 }
) {
  if (align === "start") return coords.start + margin.start;
  if (align === "middle")
    return (
      coords.start +
      (coords.end - coords.start) / 2 -
      (length + margin.start + margin.end) / 2 +
      margin.start
    );
  return (
    coords.start +
    (coords.end - coords.start) -
    (length + margin.start + margin.end) +
    margin.start
  );
};
