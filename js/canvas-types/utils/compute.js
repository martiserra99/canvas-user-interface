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

export const computeTextSize = function (text, font) {
  const ctx = document.createElement("canvas").getContext("2d");
  ctx.font = `${font.size}px ${font.family}`;
  return { width: ctx.measureText(text).width, height: font.size };
};
