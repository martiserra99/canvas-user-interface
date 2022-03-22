export const setupUtilsFunctions = function (relative) {
  relative.inner.fun("getChildMaxLeft", function (relative, child) {
    const attachToLeft = child.layoutParams.get("attachTo").left;
    if (attachToLeft === null || attachToLeft === "parent")
      return relative.get("border").size;
    const width = attachToLeft.size.width;
    const marginRight = attachToLeft.layoutParams.get("margin").right;
    const childLeft = relative.inner.call("getChildLeft", attachToLeft);
    return childLeft + width + marginRight;
  });

  relative.inner.fun("getChildMaxRight", function (relative, child) {
    const attachToRight = child.layoutParams.get("attachTo").right;
    if (attachToRight === null || attachToRight === "parent")
      return relative.inner.get("size").width - relative.get("border").size;
    const marginLeft = attachToRight.layoutParams.get("margin").left;
    const childLeft = relative.inner.call("getChildLeft", attachToRight);
    return childLeft - marginLeft;
  });

  relative.inner.fun("getChildMaxTop", function (relative, child) {
    const attachToTop = child.layoutParams.get("attachTo").top;
    if (attachToTop === null || attachToTop === "parent")
      return relative.get("border").size;
    const height = attachToTop.size.height;
    const marginBottom = attachToTop.layoutParams.get("margin").bottom;
    const childTop = relative.inner.call("getChildTop", attachToTop);
    return childTop + height + marginBottom;
  });

  relative.inner.fun("getChildMaxBottom", function (relative, child) {
    const attachToBottom = child.layoutParams.get("attachTo").bottom;
    if (attachToBottom === null || attachToBottom === "parent")
      return relative.inner.get("size").height - relative.get("border").size;
    const marginTop = attachToBottom.layoutParams.get("margin").top;
    const childTop = relative.inner.call("getChildTop", attachToBottom);
    return childTop - marginTop;
  });

  relative.inner.fun("getChildLeft", function (relative, child) {
    const attachTo = child.layoutParams.get("attachTo");
    const margin = child.layoutParams.get("margin");

    const maxLeft = relative.inner.call("getChildMaxLeft", child);
    const maxRight = relative.inner.call("getChildMaxRight", child);

    const width = child.size.width;

    if (attachTo.right === null) return maxLeft + margin.left;
    if (attachTo.left === null) return maxRight - margin.right - width;

    const coords = { start: maxLeft, end: maxRight };
    const bias = child.layoutParams.get("bias").horizontal;

    return relative.inner.call("getCoordUsingBias", coords, width, bias, {
      start: margin.left,
      end: margin.right,
    });
  });

  relative.inner.fun("getChildTop", function (relative, child) {
    const attachTo = child.layoutParams.get("attachTo");
    const margin = child.layoutParams.get("margin");

    const maxTop = relative.inner.call("getChildMaxTop", child);
    const maxBottom = relative.inner.call("getChildMaxBottom", child);

    const height = child.size.height;

    if (attachTo.bottom === null) return maxTop + margin.top;
    if (attachTo.top === null) return maxBottom - margin.bottom - height;

    const coords = { start: maxTop, end: maxBottom };
    const bias = child.layoutParams.get("bias").vertical;

    return relative.inner.call("getCoordUsingBias", coords, height, bias, {
      start: margin.top,
      end: margin.bottom,
    });
  });

  relative.inner.fun(
    "getCoordUsingBias",
    function (relative, coords, length, bias, margin) {
      return (
        coords.start +
        (coords.end - coords.start - (length + margin.start + margin.end)) *
          (bias / 100) +
        margin.start
      );
    }
  );
};
