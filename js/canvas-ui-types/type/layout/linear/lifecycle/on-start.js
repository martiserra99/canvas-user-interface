export const onStart = function (layout, inner) {
  inner.set("horizontal", getHorizontal(layout));
  inner.set("reverse", getReverse(layout));
  inner.set("sortedChilds", getSortedChilds(layout, inner));
};

const getHorizontal = (layout) =>
  layout.get("direction") === "horizontal" ||
  layout.get("direction") === "reverse-horizontal";

const getReverse = (layout) =>
  layout.get("direction") === "reverse-horizontal" ||
  layout.get("direction") === "reverse-vertical";

const getSortedChilds = function (layout, inner) {
  const sortedChilds = [...layout.childs].sort(
    (first, second) =>
      first.layoutParams.get("position") - second.layoutParams.get("position")
  );
  if (inner.get("reverse")) sortedChilds.reverse();
  return sortedChilds;
};
