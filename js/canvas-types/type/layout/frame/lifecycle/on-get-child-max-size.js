export const onGetChildMaxSize = function (layout, inner, maxSize, child) {
  const availableSizeNoBorder = inner.get("availableSizeNoBorder");
  const childMargin = child.layoutParams.get("margin");
  return {
    width: availableSizeNoBorder.width - childMargin.left - childMargin.right,
    height: availableSizeNoBorder.height - childMargin.top - childMargin.bottom,
  };
};
