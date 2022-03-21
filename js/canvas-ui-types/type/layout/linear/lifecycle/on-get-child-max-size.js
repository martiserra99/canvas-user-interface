export const onGetChildMaxSize = function (
  layout,
  inner,
  child,
  childsWithSizes
) {
  return getChildMaxSize(layout, inner, child, childsWithSizes);
};

const getChildMaxSize = function (layout, inner, child, childsWithSizes) {
  const maxExtendedSize = getChildMaxExtendedSize(
    layout,
    inner,
    childsWithSizes
  );
  const margin = child.layoutParams.get("margin");
  return {
    width: maxExtendedSize.width - margin.left - margin.right,
    height: maxExtendedSize.height - margin.top - margin.bottom,
  };
};

const getChildMaxExtendedSize = function (layout, inner, childsWithSizes) {
  return {
    width: getChildMaxExtendedWidth(layout, inner, childsWithSizes),
    height: getChildMaxExtendedHeight(layout, inner, childsWithSizes),
  };
};

const getChildMaxExtendedWidth = function (layout, inner, childsWithSizes) {
  if (!inner.get("horizontal")) return inner.get("availableSizeNoBorder").width;
  let maxExtendedLength = inner.get("childMaxExtendedLength");
  if (childsWithSizes.length === 0) return maxExtendedLength;
  const lastChild = childsWithSizes[childsWithSizes.length - 1];
  const length = lastChild.size.width;
  const margin = lastChild.layoutParams.get("margin");
  maxExtendedLength -= length + margin.left + margin.right + layout.get("gap");
  inner.set("childMaxExtendedLength", maxExtendedLength);
  return maxExtendedLength;
};

const getChildMaxExtendedHeight = function (layout, inner, childsWithSizes) {
  if (inner.get("horizontal")) return inner.get("availableSizeNoBorder").height;
  let maxExtendedLength = inner.get("childMaxExtendedLength");
  if (childsWithSizes.length === 0) return maxExtendedLength;
  const lastChild = childsWithSizes[childsWithSizes.length - 1];
  const length = lastChild.size.height;
  const margin = lastChild.layoutParams.get("margin");
  maxExtendedLength -= length + margin.top + margin.bottom + layout.get("gap");
  inner.set("childMaxExtendedLength", maxExtendedLength);
  return maxExtendedLength;
};
