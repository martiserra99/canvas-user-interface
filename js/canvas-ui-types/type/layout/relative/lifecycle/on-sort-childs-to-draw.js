export const onSortChildsToDraw = function (layout, inner) {
  return [...layout.childs].sort(
    (first, second) =>
      first.layoutParams.get("zIndex") - second.layoutParams.get("zIndex")
  );
};
