export const getChildMaxLeft = function (relative, inner, child) {
  const attachToLeft = child.layoutParams.get("attachTo").left;
  if (attachToLeft === null || attachToLeft === "parent")
    return relative.get("border").size;
  const width = attachToLeft.size.width;
  const marginRight = attachToLeft.layoutParams.get("margin").right;
  return getChildLeft(relative, inner, attachToLeft) + width + marginRight;
};

export const getChildMaxRight = function (relative, inner, child) {
  const attachToRight = child.layoutParams.get("attachTo").right;
  if (attachToRight === null || attachToRight === "parent")
    return inner.get("size").width - relative.get("border").size;
  const marginLeft = attachToRight.layoutParams.get("margin").left;
  return getChildLeft(relative, inner, attachToRight) - marginLeft;
};

export const getChildMaxTop = function (relative, inner, child) {
  const attachToTop = child.layoutParams.get("attachTo").top;
  if (attachToTop === null || attachToTop === "parent")
    return relative.get("border").size;
  const height = attachToTop.size.height;
  const marginBottom = attachToTop.layoutParams.get("margin").bottom;
  return getChildTop(relative, inner, attachToTop) + height + marginBottom;
};

export const getChildMaxBottom = function (relative, inner, child) {
  const attachToBottom = child.layoutParams.get("attachTo").bottom;
  if (attachToBottom === null || attachToBottom === "parent")
    return inner.get("size").height - relative.get("border").size;
  const marginTop = attachToBottom.layoutParams.get("margin").top;
  return getChildTop(relative, inner, attachToBottom) - marginTop;
};

export const getChildLeft = function (relative, inner, child) {
  const attachTo = child.layoutParams.get("attachTo");
  const margin = child.layoutParams.get("margin");

  const maxLeft = getChildMaxLeft(relative, inner, child);
  const maxRight = getChildMaxRight(relative, inner, child);

  const width = child.size.width;

  if (attachTo.right === null) return maxLeft + margin.left;
  if (attachTo.left === null) return maxRight - margin.right - width;

  const coords = { start: maxLeft, end: maxRight };
  const bias = child.layoutParams.get("bias").horizontal;

  return coordBias(coords, width, bias, {
    start: margin.left,
    end: margin.right,
  });
};

export const getChildTop = function (relative, inner, child) {
  const attachTo = child.layoutParams.get("attachTo");
  const margin = child.layoutParams.get("margin");

  const maxTop = getChildMaxTop(relative, inner, child);
  const maxBottom = getChildMaxBottom(relative, inner, child);

  const height = child.size.height;

  if (attachTo.bottom === null) return maxTop + margin.top;
  if (attachTo.top === null) return maxBottom - margin.bottom - height;

  const coords = { start: maxTop, end: maxBottom };
  const bias = child.layoutParams.get("bias").vertical;

  return coordBias(coords, height, bias, {
    start: margin.top,
    end: margin.bottom,
  });
};

const coordBias = function (coords, length, bias, margin) {
  return (
    coords.start +
    (coords.end - coords.start - (length + margin.start + margin.end)) *
      (bias / 100) +
    margin.start
  );
};
