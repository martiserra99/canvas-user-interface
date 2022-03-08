export const addMouseDownAnywhereEvent = function (type, config) {
  type.events.set("mousedown-anywhere", function (element, signal, state) {
    if (signal.type !== "mousedown") return { check: false };
    return { check: true, event: config.getMouseEvent(element, signal, state) };
  });
};

export const addMouseUpAnywhereEvent = function (type, config) {
  type.events.set("mouseup-anywhere", function (element, signal, state) {
    if (signal.type !== "mouseup") return { check: false };
    return { check: true, event: config.getMouseEvent(element, signal, state) };
  });
};

export const addMouseMoveAnywhereEvent = function (type, config) {
  type.events.set("mousemove-anywhere", function (element, signal, state) {
    if (signal.type !== "mousemove") return { check: false };
    return { check: true, event: config.getMouseEvent(element, signal, state) };
  });
};

export const addKeyDownEvent = function (type, config) {
  type.events.set("keydown", function (element, signal, state) {
    if (signal.type !== "keydown") return { check: false };
    return { check: true, event: config.getKeyEvent(element, signal, state) };
  });
};

export const addKeyUpEvent = function (type, config) {
  type.events.set("keyup", function (element, signal, state) {
    if (signal.type !== "keyup") return { check: false };
    return { check: true, event: config.getKeyEvent(element, signal, state) };
  });
};

export const addMouseDownEvent = function (type, config) {
  type.events.set("mousedown", function (element, signal, state) {
    if (signal.type !== "mousedown") return { check: false };
    const coords = signal.data.coords;
    if (!config.areCoordsInElement(element, coords)) return { check: false };
    return { check: true, event: config.getMouseEvent(element, signal, state) };
  });
};

export const addMouseUpEvent = function (type, config) {
  type.events.set("mouseup", function (element, signal, state) {
    if (signal.type !== "mouseup") return { check: false };
    const coords = signal.data.coords;
    if (!config.areCoordsInElement(element, coords)) return { check: false };
    return { check: true, event: config.getMouseEvent(element, signal, state) };
  });
};

export const addMouseMoveEvent = function (type, config) {
  type.events.set("mousemove", function (element, signal, state) {
    if (signal.type !== "mousemove") return { check: false };
    const coords = signal.data.coords;
    if (!config.areCoordsInElement(element, coords)) return { check: false };
    return { check: true, event: config.getMouseEvent(element, signal, state) };
  });
};

export const addMouseEnterEvent = function (type, config) {
  type.events.set("mouseenter", function (element, signal, state) {
    if (signal.type === "mouseleave") state.set("wasOut", true);
    if (signal.type !== "mousemove") return { check: false };
    const coords = signal.data.coords;
    const isIn = config.areCoordsInElement(element, coords);
    const wasOut = state.get("wasOut") ?? true;
    const check = isIn && wasOut;
    state.set("wasOut", !isIn);
    return { check, event: config.getMouseEvent(element, signal, state) };
  });
};

export const addMouseLeaveEvent = function (type, config) {
  type.events.set("mouseleave", function (element, signal, state) {
    if (signal.type === "mouseleave") {
      state.set("wasIn", false);
      return {
        check: true,
        event: config.getMouseEvent(element, signal, state),
      };
    }
    if (signal.type !== "mousemove") return { check: false };
    const coords = signal.data.coords;
    const isOut = !config.areCoordsInElement(element, coords);
    const wasIn = state.get("wasIn") ?? false;
    const check = isOut && wasIn;
    state.set("wasIn", !isOut);
    return { check, event: config.getMouseEvent(element, signal, state) };
  });
};

export const addClickEvent = function (type, config) {
  type.events.set("click", function (element, signal, state) {
    if (signal.type !== "mousedown" && signal.type !== "mouseup")
      return { check: false };
    const coords = signal.data.coords;
    const isIn = config.areCoordsInElement(element, coords);
    if (signal.type === "mousedown") {
      state.set("wasMouseDown", isIn);
      return { check: false };
    }
    const wasMouseDown = state.get("wasMouseDown") ?? false;
    const check = isIn && wasMouseDown;
    return { check, event: config.getMouseEvent(element, signal, state) };
  });
};

export const addMouseEvents = function (type, config) {
  addMouseDownAnywhereEvent(type, config);
  addMouseUpAnywhereEvent(type, config);
  addMouseMoveAnywhereEvent(type, config);
  addMouseDownEvent(type, config);
  addMouseUpEvent(type, config);
  addMouseMoveEvent(type, config);
  addMouseEnterEvent(type, config);
  addMouseLeaveEvent(type, config);
  addClickEvent(type, config);
};

export const addKeyEvents = function (type, config) {
  addKeyDownEvent(type, config);
  addKeyUpEvent(type, config);
};

export const addAllEvents = function (type, config) {
  addMouseEvents(type, config);
  addKeyEvents(type, config);
};

export const areCoordsInArea = function (
  coords,
  rectCoords,
  rectSize,
  rectCorner
) {
  if (!rectCorner) return inRectangle(coords, rectCoords, rectSize);

  if (!inRectangle(coords, rectCoords, rectSize)) return false;

  let rectCornerSize = rectCorner.size;
  if (rectCorner.size > rectSize.width / 2) rectCornerSize = rectSize.width / 2;
  if (rectCorner.size > rectSize.height / 2)
    rectCornerSize = rectSize.height / 2;
  rectCorner = { type: rectCorner.type, size: rectCornerSize };

  const verticalRectX = rectCoords.x + rectCorner.size;
  const verticalRectY = rectCoords.y;
  const verticalRectCoords = { x: verticalRectX, y: verticalRectY };

  const verticalRectWidth = rectSize.width - rectCorner.size * 2;
  const verticalRectHeight = rectSize.height;
  const verticalRectSize = {
    width: verticalRectWidth,
    height: verticalRectHeight,
  };

  if (inRectangle(coords, verticalRectCoords, verticalRectSize)) return true;

  const horizontalRectX = rectCoords.x;
  const horizontalRectY = rectCoords.y + rectCorner.size;
  const horizontalRectCoords = { x: horizontalRectX, y: horizontalRectY };

  const horizontalRectWidth = rectSize.width;
  const horizontalRectHeight = rectSize.height - rectCorner.size * 2;
  const horizontalRectSize = {
    width: horizontalRectWidth,
    height: horizontalRectHeight,
  };

  if (inRectangle(coords, horizontalRectCoords, horizontalRectSize))
    return true;

  if (
    inTopLeftRect(coords, rectCoords, rectSize, rectCorner) ||
    inTopRightRect(coords, rectCoords, rectSize, rectCorner) ||
    inBottomRightRect(coords, rectCoords, rectSize, rectCorner) ||
    inBottomLeftRect(coords, rectCoords, rectSize, rectCorner)
  )
    return true;

  return false;
};

const inRectangle = function (coords, rectCoords, rectSize) {
  return (
    coords.x >= rectCoords.x &&
    coords.y >= rectCoords.y &&
    coords.x <= rectCoords.x + rectSize.width &&
    coords.y <= rectCoords.y + rectSize.height
  );
};

const inTopLeftRect = function (coords, rectCoords, rectSize, rectCorner) {
  const squareCoords = rectCoords;
  const squareSize = rectCorner.size;
  if (!inRectangle(coords, squareCoords, squareSize)) return false;
  const innerCoords = {
    x: squareCoords.x + squareSize,
    y: squareCoords.y + squareSize,
  };
  if (rectCorner.type === "round")
    return euclideanDistance(coords, innerCoords) <= squareSize;
  return manhattanDistance(coords, innerCoords) <= squareSize;
};

const inTopRightRect = function (coords, rectCoords, rectSize, rectCorner) {
  const squareCoords = {
    x: rectCoords.x + rectSize.width - rectCorner.size,
    y: rectCoords.y,
  };
  const squareSize = rectCorner.size;
  if (!inRectangle(coords, squareCoords, squareSize)) return false;
  const innerCoords = { x: squareCoords.x, y: squareCoords.y + squareSize };
  if (rectCorner.type === "round")
    return euclideanDistance(coords, innerCoords) <= squareSize;
  return manhattanDistance(coords, innerCoords) <= squareSize;
};

const inBottomRightRect = function (coords, rectCoords, rectSize, rectCorner) {
  const squareCoords = {
    x: rectCoords.x + rectSize.width - rectCorner.size,
    y: rectCoords.y + rectSize.height - rectCorner.size,
  };
  const squareSize = rectCorner.size;
  if (!inRectangle(coords, squareCoords, squareSize)) return false;
  const innerCoords = { x: squareCoords.x, y: squareCoords.y };
  if (rectCorner.type === "round")
    return euclideanDistance(coords, innerCoords) <= squareSize;
  return manhattanDistance(coords, innerCoords) <= squareSize;
};

const inBottomLeftRect = function (coords, rectCoords, rectSize, rectCorner) {
  const squareCoords = {
    x: rectCoords.x,
    y: rectCoords.y + rectSize.height - rectCorner.size,
  };
  const squareSize = rectCorner.size;
  if (!inRectangle(coords, squareCoords, squareSize)) return false;
  const innerCoords = { x: squareCoords.x + squareSize, y: squareCoords.y };
  if (rectCorner.type === "round")
    return euclideanDistance(coords, innerCoords) <= squareSize;
  return manhattanDistance(coords, innerCoords) <= squareSize;
};

const euclideanDistance = function (first, second) {
  return Math.sqrt((first.x - second.x) ** 2 + (first.y - second.y) ** 2);
};

const manhattanDistance = function (first, second) {
  return Math.abs(first.x - second.x) + Math.abs(first.y - second.y);
};
