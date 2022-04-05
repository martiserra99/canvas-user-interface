export const setupStartLifecycleFunctions = function (linear) {
  linear.lifecycle.set("onStart", function (linear) {
    const horizontal =
      linear.get("direction") === "horizontal" ||
      linear.get("direction") === "reverse-horizontal";

    const reverse =
      linear.get("direction") === "reverse-horizontal" ||
      linear.get("direction") === "reverse-vertical";

    const sortedchildren = [...linear.children].sort(
      (first, second) =>
        first.layoutParams.get("position") - second.layoutParams.get("position")
    );
    if (reverse) sortedchildren.reverse();

    linear.inner.set("horizontal", horizontal);
    linear.inner.set("reverse", reverse);
    linear.inner.set("sortedchildren", sortedchildren);
  });
};
