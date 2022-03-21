export const onStart = function (layout, inner) {
  inner.set("sortedCorrectChilds", getSortedCorrectChilds(layout));
  inner.set("incorrectChilds", getIncorrectChilds(layout, inner));
  inner.set("sortedChilds", getSortedChilds(inner));
};

const getSortedCorrectChilds = function (layout) {
  const sortedChilds = [];
  const childs = [...layout.childs];
  while (childs.length > 0) {
    let inserted = false;
    for (let i = 0; i < childs.length; i++) {
      const child = childs[i];
      if (canAddChild(sortedChilds, child)) {
        sortedChilds.push(child);
        childs.splice(i, 1);
        i--;
        inserted = true;
      }
    }
    if (!inserted) break;
  }
  return sortedChilds;
};

const canAddChild = function (childs, child) {
  const { top, bottom, right, left } = child.layoutParams.get("attachTo");
  for (const direction of [top, bottom, right, left]) {
    if (
      direction !== null &&
      direction !== "parent" &&
      !childs.includes(direction)
    ) {
      return false;
    }
  }
  return true;
};

const getIncorrectChilds = (layout, inner) =>
  layout.childs.filter(
    (child) => !inner.get("sortedCorrectChilds").includes(child)
  );

const getSortedChilds = (inner) => [
  ...inner.get("sortedCorrectChilds"),
  ...inner.get("incorrectChilds"),
];
