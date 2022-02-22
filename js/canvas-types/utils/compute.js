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
