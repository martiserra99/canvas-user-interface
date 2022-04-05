export const setupStartLifecycleFunctions = function (relative) {
  relative.lifecycle.set("onStart", function (relative) {
    const sortedPositionedchildren = relative.inner.call(
      "getSortedPositionedchildren"
    );
    const notPositionedchildren = relative.children.filter(
      (child) => !sortedPositionedchildren.includes(child)
    );
    const sortedchildren = [
      ...sortedPositionedchildren,
      ...notPositionedchildren,
    ];
    relative.inner.set("sortedchildren", sortedchildren);
    relative.inner.set("notPositionedchildren", notPositionedchildren);
  });

  relative.inner.fun("getSortedPositionedchildren", function (relative) {
    const sortedchildren = [];
    const children = [...relative.children];
    while (children.length > 0) {
      let inserted = false;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (relative.inner.call("canPositionChild", sortedchildren, child)) {
          sortedchildren.push(child);
          children.splice(i, 1);
          i--;
          inserted = true;
        }
      }
      if (!inserted) break;
    }
    return sortedchildren;
  });

  relative.inner.fun("canPositionChild", function (relative, children, child) {
    const { top, bottom, right, left } = child.layoutParams.get("attachTo");
    for (const direction of [top, bottom, right, left]) {
      if (
        direction !== null &&
        direction !== "parent" &&
        !children.includes(direction)
      ) {
        return false;
      }
    }
    return true;
  });
};
