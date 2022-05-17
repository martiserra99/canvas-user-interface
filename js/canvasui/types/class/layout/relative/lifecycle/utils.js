export const setupUtilsFunctions = function (relative) {
  relative.inner.fun("getChildMaxLeft", function (relative, child) {
    const attachToLeft = child.layoutParams.get("attachTo").left;
    if (attachToLeft === null || attachToLeft === "parent")
      return relative.get("border").size;
    const { side, child: childLeftId } = attachToLeft;
    const childLeft = relative.find(childLeftId);
    if (side === "left") return relative.inner.call("getChildLeft", childLeft);
    return relative.inner.call("getChildRight", childLeft);
  });

  relative.inner.fun("getChildMaxRight", function (relative, child) {
    const attachToRight = child.layoutParams.get("attachTo").right;
    if (attachToRight === null || attachToRight === "parent")
      return relative.inner.get("size").width - relative.get("border").size;
    const { side, child: childRightId } = attachToRight;
    const childRight = relative.find(childRightId);
    if (side === "left") return relative.inner.call("getChildLeft", childRight);
    return relative.inner.call("getChildRight", childRight);
  });

  relative.inner.fun("getChildMaxTop", function (relative, child) {
    const attachToTop = child.layoutParams.get("attachTo").top;
    if (attachToTop === null || attachToTop === "parent")
      return relative.get("border").size;
    const { side, child: childTopId } = attachToTop;
    const childTop = relative.find(childTopId);
    if (side === "top") return relative.inner.call("getChildTop", childTop);
    return relative.inner.call("getChildBottom", childTop);
  });

  relative.inner.fun("getChildMaxBottom", function (relative, child) {
    const attachToBottom = child.layoutParams.get("attachTo").bottom;
    if (attachToBottom === null || attachToBottom === "parent")
      return relative.inner.get("size").height - relative.get("border").size;
    const { side, child: childBottomId } = attachToBottom;
    const childBottom = relative.find(childBottomId);
    if (side === "top") return relative.inner.call("getChildTop", childBottom);
    return relative.inner.call("getChildBottom", childBottom);
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

  relative.inner.fun("getChildRight", function (relative, child) {
    const childLeft = relative.inner.call("getChildLeft", child);
    const childWidth = child.size.width;
    return childLeft + childWidth;
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

  relative.inner.fun("getChildBottom", function (relative, child) {
    const childTop = relative.inner.call("getChildTop", child);
    const childHeight = child.size.height;
    return childTop + childHeight;
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
