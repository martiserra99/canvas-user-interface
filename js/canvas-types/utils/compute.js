export const computeLength = function (desiredLength, maxLength, autoLength) {
  let result = desiredLength === null ? autoLength() : desiredLength;
  if (result > maxLength) result = maxLength;
  if (result < 0) result = 0;
  return result;
};
