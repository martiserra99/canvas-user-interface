export const setupStartLifecycleFunctions = function (linear) {
  linear.lifecycle.set("onStart", function (linear) {
    const horizontal =
      linear.get("direction") === "horizontal" ||
      linear.get("direction") === "reverse-horizontal";

    const reverse =
      linear.get("direction") === "reverse-horizontal" ||
      linear.get("direction") === "reverse-vertical";

    const sortedChilds = [...linear.childs].sort(
      (first, second) =>
        first.layoutParams.get("position") - second.layoutParams.get("position")
    );
    if (reverse) sortedChilds.reverse();

    linear.inner.set("horizontal", horizontal);
    linear.inner.set("reverse", reverse);
    linear.inner.set("sortedChilds", sortedChilds);
  });
};
