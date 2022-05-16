import { measure } from "../../../../../utils/measure.js";

export const setupMeasureLifecycleFunctions = function (frame) {
  frame.lifecycle.set("onMeasure", function (frame, maxSize) {
    const desiredSize = measure.desiredSize(frame.get("size"), maxSize);
    const availableSize = measure.availableSize(desiredSize, maxSize);
    const availableContentSize = {
      width: availableSize.width - frame.get("border").size * 2,
      height: availableSize.height - frame.get("border").size * 2,
    };
    frame.inner.set("desiredSize", desiredSize);
    frame.inner.set("availableSize", availableSize);
    frame.inner.set("availableContentSize", availableContentSize);
  });

  frame.lifecycle.set("getChildMaxSize", function (frame, maxSize, child) {
    const availableContentSize = frame.inner.get("availableContentSize");
    const margin = child.layoutParams.get("margin");
    let width = availableContentSize.width - margin.left - margin.right;
    if (width < 0) width = 0;
    let height = availableContentSize.height - margin.top - margin.bottom;
    if (height < 0) height = 0;
    return { width, height };
  });

  frame.lifecycle.set("getSize", function (frame, maxSize) {
    const size = measure.size(frame.inner.get("desiredSize"), maxSize, {
      width: () => frame.inner.call("getAutoWidth"),
      height: () => frame.inner.call("getAutoHeight"),
    });

    frame.inner.set("contentSize", {
      width: size.width - frame.get("border").size * 2,
      height: size.height - frame.get("border").size * 2,
    });

    return size;
  });

  frame.inner.fun("getAutoWidth", function (frame) {
    return (
      frame.children.reduce((acc, child) => {
        const margin = child.layoutParams.get("margin");
        const length = child.size.width + margin.left + margin.right;
        return acc > length ? acc : length;
      }, 0) +
      frame.get("border").size * 2
    );
  });

  frame.inner.fun("getAutoHeight", function (frame) {
    return (
      frame.children.reduce((acc, child) => {
        const margin = child.layoutParams.get("margin");
        const length = child.size.height + margin.top + margin.bottom;
        return acc > length ? acc : length;
      }, 0) +
      frame.get("border").size * 2
    );
  });
};
