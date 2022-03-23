export const setupStartLifecycleFunctions = function (relative) {
  relative.lifecycle.set("onStart", function (relative) {
    const sortedPositionedChilds = relative.inner.call(
      "getSortedPositionedChilds"
    );
    const notPositionedChilds = relative.childs.filter(
      (child) => !sortedPositionedChilds.includes(child)
    );
    const sortedChilds = [...sortedPositionedChilds, ...notPositionedChilds];
    relative.inner.set("sortedChilds", sortedChilds);
    relative.inner.set("notPositionedChilds", notPositionedChilds);
  });

  relative.inner.fun("getSortedPositionedChilds", function (relative) {
    const sortedChilds = [];
    const childs = [...relative.childs];
    while (childs.length > 0) {
      let inserted = false;
      for (let i = 0; i < childs.length; i++) {
        const child = childs[i];
        if (relative.inner.call("canPositionChild", sortedChilds, child)) {
          sortedChilds.push(child);
          childs.splice(i, 1);
          i--;
          inserted = true;
        }
      }
      if (!inserted) break;
    }
    return sortedChilds;
  });

  relative.inner.fun("canPositionChild", function (relative, childs, child) {
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
  });
};
