export class Events {
  constructor() {
    this._events = new Map();
    this._add();
  }

  [Symbol.iterator]() {
    return this._events[Symbol.iterator]();
  }

  set(name, onCheck) {
    this._events.set(name, { onCheck, callbacks: [] });
  }

  get(name) {
    return this._events.get(name);
  }

  _add() {
    this._click();
    this._mousedown();
    this._mouseup();
    this._mouseenter();
    this._mouseleave();
    this._mousemove();
    this._keydown();
    this._keyup();
  }

  _click() {
    this.set("click", function (element, signal, state) {
      if (signal.type !== "mousedown" && signal.type !== "mouseup")
        return { check: false };
      const coords = signal.data.coords;
      const isIn = coordsInElement(coords, element);
      if (signal.type === "mousedown") {
        state.set("wasMouseDown", isIn);
        return { check: false };
      }
      const wasMouseDown = state.get("wasMouseDown") ?? false;
      const check = isIn && wasMouseDown;
      return { check, event: signal.data };
    });
  }

  _mousedown() {
    this.set("mousedown", function (element, signal, state) {
      if (signal.type !== "mousedown") return { check: false };
      const coords = signal.data.coords;
      if (!coordsInElement(coords, element)) return { check: false };
      return {
        check: true,
        event: signal.data,
      };
    });
  }

  _mouseup() {
    this.set("mouseup", function (element, signal, state) {
      if (signal.type !== "mouseup") return { check: false };
      const coords = signal.data.coords;
      if (!coordsInElement(coords, element)) return { check: false };
      return {
        check: true,
        event: signal.data,
      };
    });
  }

  _mouseenter() {
    this.set("mouseenter", function (element, signal, state) {
      if (signal.type === "mouseleave") state.set("wasOut", true);
      if (signal.type !== "mousemove") return { check: false };
      const coords = signal.data.coords;
      const isIn = coordsInElement(coords, element);
      const wasOut = state.get("wasOut") ?? true;
      const check = isIn && wasOut;
      state.set("wasOut", !isIn);
      return { check, event: signal.data };
    });
  }

  _mouseleave() {
    this.set("mouseleave", function (element, signal, state) {
      if (signal.type === "mouseleave") {
        state.set("wasIn", false);
        return {
          check: true,
          event: signal.data,
        };
      }
      if (signal.type !== "mousemove") return { check: false };
      const coords = signal.data.coords;
      const isOut = !coordsInElement(coords, element);
      const wasIn = state.get("wasIn") ?? false;
      const check = isOut && wasIn;
      state.set("wasIn", !isOut);
      return { check, event: signal.data };
    });
  }

  _mousemove() {
    this.set("mousemove", function (element, signal, state) {
      if (signal.type !== "mousemove") return { check: false };
      const coords = signal.data.coords;
      if (!coordsInElement(coords, element)) return { check: false };
      return {
        check: true,
        event: signal.data,
      };
    });
  }

  _keydown() {
    this.set("keydown", function (element, signal, state) {
      if (signal.type !== "keydown") return { check: false };
      return { check: true, event: signal.data };
    });
  }

  _keyup() {
    this.set("keyup", function (element, signal, state) {
      if (signal.type !== "keyup") return { check: false };
      return { check: true, event: signal.data };
    });
  }
}

const coordsInElement = function (coords, element) {
  return (
    coords.x >= element.coords.x &&
    coords.y >= element.coords.y &&
    coords.x <= element.coords.x + element.size.width &&
    coords.y <= element.coords.y + element.size.height
  );
};
