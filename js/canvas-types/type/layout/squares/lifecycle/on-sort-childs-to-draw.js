export const onSortChildsToDraw = function (layout, inner) {
  return [...layout.childs].sort(
    (first, second) =>
      first.layoutParams.get("z-index") - second.layoutParams.get("z-index")
  );
};
