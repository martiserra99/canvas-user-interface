import { locate } from "../../../../../utils/locate.js";

export const setupLocateLifecycleFunctions = function (linear) {
  linear.lifecycle.set("onLocate", function (linear, coords) {
    const contentCoords = {
      x: coords.x + linear.get("border").size,
      y: coords.y + linear.get("border").size,
    };
    const childsCoord = linear.inner.call("getChildsCoord", contentCoords);

    linear.inner.set("contentCoords", contentCoords);
    linear.inner.set("childsCoord", childsCoord);
  });

  linear.inner.fun("getChildsCoord", function (linear, contentCoords) {
    const horizontal = linear.inner.get("horizontal");
    const contentSize = linear.inner.get("contentSize");
    const childsSize = linear.inner.get("childsSize");
    const alignContent = linear.get("alignContent");

    if (horizontal) {
      const length = childsSize.width;
      const coords = {
        start: contentCoords.x,
        end: contentCoords.x + contentSize.width,
      };

      if (alignContent === "start") return locate.alignStart(coords, length);
      else if (alignContent === "middle")
        return locate.alignMiddle(coords, length);
      else return locate.alignEnd(coords, length);
    }

    const length = childsSize.height;
    const coords = {
      start: contentCoords.y,
      end: contentCoords.y + contentSize.height,
    };

    if (alignContent === "start") return locate.alignStart(coords, length);
    else if (alignContent === "middle")
      return locate.alignMiddle(coords, length);
    else return locate.alignEnd(coords, length);
  });

  linear.lifecycle.set("onSortChildsToLocate", function (linear) {
    return linear.inner.get("sortedChilds");
  });

  linear.lifecycle.set(
    "onGetChildCoords",
    function (linear, coords, child, childsWithCoords) {
      const x = linear.inner.call("getChildX", child, childsWithCoords);
      const y = linear.inner.call("getChildY", child, childsWithCoords);
      return { x, y };
    }
  );

  linear.inner.fun("getChildX", function (linear, child, childsWithCoords) {
    const horizontal = linear.inner.get("horizontal");
    if (horizontal) {
      const isFirst = childsWithCoords.length === 0;
      const margin = child.layoutParams.get("margin");

      if (isFirst) {
        const childsCoord = linear.inner.get("childsCoord");
        return childsCoord + margin.left;
      }

      const last = childsWithCoords[childsWithCoords.length - 1];
      const gap = linear.get("gap");
      return (
        last.coords.x +
        last.size.width +
        last.layoutParams.get("margin").right +
        gap +
        margin.left
      );
    }

    const contentCoords = linear.inner.get("contentCoords");
    const contentSize = linear.inner.get("contentSize");

    const coords = {
      start: contentCoords.x,
      end: contentCoords.x + contentSize.width,
    };
    const length = child.size.width;

    const margin = {
      start: child.layoutParams.get("margin").left,
      end: child.layoutParams.get("margin").right,
    };

    const alignItems = linear.get("alignItems");
    const alignSelf = child.layoutParams.get("alignSelf");
    const align = alignSelf === "auto" ? alignItems : alignSelf;

    if (align === "start") return locate.alignStart(coords, length, margin);
    else if (align === "middle")
      return locate.alignMiddle(coords, length, margin);
    else return locate.alignEnd(coords, length, margin);
  });

  linear.inner.fun("getChildY", function (linear, child, childsWithCoords) {
    const horizontal = linear.inner.get("horizontal");
    if (!horizontal) {
      const isFirst = childsWithCoords.length === 0;
      const margin = child.layoutParams.get("margin");

      if (isFirst) {
        const childsCoord = linear.inner.get("childsCoord");
        return childsCoord + margin.top;
      }

      const last = childsWithCoords[childsWithCoords.length - 1];
      const gap = linear.get("gap");
      return (
        last.coords.y +
        last.size.height +
        last.layoutParams.get("margin").bottom +
        gap +
        margin.top
      );
    }

    const contentCoords = linear.inner.get("contentCoords");
    const contentSize = linear.inner.get("contentSize");

    const coords = {
      start: contentCoords.y,
      end: contentCoords.y + contentSize.height,
    };
    const length = child.size.height;

    const margin = {
      start: child.layoutParams.get("margin").top,
      end: child.layoutParams.get("margin").bottom,
    };

    const alignItems = linear.get("alignItems");
    const alignSelf = child.layoutParams.get("alignSelf");
    const align = alignSelf === "auto" ? alignItems : alignSelf;

    if (align === "start") return locate.alignStart(coords, length, margin);
    else if (align === "middle")
      return locate.alignMiddle(coords, length, margin);
    else return locate.alignEnd(coords, length, margin);
  });
};
