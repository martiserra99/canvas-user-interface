const dpr = window.devicePixelRatio || 1;

export class UI {
  constructor(selector) {
    this._setCanvas(selector);
    this._setCanvasSize();
    this._setCanvasSizeOnResize();
  }

  _setCanvas(selector) {
    this._canvas = document.querySelector(selector);
    this._ctx = this._canvas.getContext("2d");
  }

  _setCanvasSize() {
    const { width, height } = this._canvas.getBoundingClientRect();
    this._width = width;
    this._height = height;
    this._canvas.width = width * dpr;
    this._canvas.height = height * dpr;
    this._ctx.scale(dpr, dpr);
  }

  _setCanvasSizeOnResize() {
    this._resizeListener = this._setCanvasSize.bind(this);
    window.addEventListener("resize", this._resizeListener);
  }

  start(element) {
    if (this._started) this.end();
    this._insertElement(element);
    this._startAnimation();
    this._setupSignals();
    this._started = true;
  }

  _insertElement(element) {
    element.insertToUI(this);
  }

  _startAnimation() {
    const animate = () => {
      this._animationId = requestAnimationFrame(animate);
      this._updateUI();
    };
    animate();
  }

  _updateUI() {
    this._clearCanvas();
    this.element.start();
    this.element.measure(this._getMaxSize());
    this.element.locate(this._getCoords());
    this.element.draw(this._ctx);
    this.element.end();
  }

  _getMaxSize() {
    return { width: this._width, height: this._height };
  }

  _getCoords() {
    return { x: 0, y: 0 };
  }

  _setupSignals() {
    this._setupMouseSignals();
    this._setupKeySignals();
  }

  _setupMouseSignals() {
    this._mouseSignals = [];
    const types = this._getMouseSignalTypes();
    for (const type of types) {
      const callback = function (event) {
        const data = this._getMouseSignalData(event);
        this.element.signal({ type, data });
      }.bind(this);
      this._mouseSignals.push({ type, callback });
      this._canvas.addEventListener(type, callback);
    }
  }

  _getMouseSignalTypes() {
    return ["mousedown", "mouseup", "mousemove", "mouseenter", "mouseleave"];
  }

  _getMouseSignalData(event) {
    return { x: event.clientX, y: event.clientY };
  }

  _setupKeySignals() {
    this._keySignals = [];
    const types = this._getKeySignalTypes();
    for (const type of types) {
      const callback = function (event) {
        if (event.repeat) return;
        const data = this._getKeySignalData(event);
        this.element.signal({ type, data });
      }.bind(this);
      this._keySignals.push({ type, callback });
      window.addEventListener(type, callback);
    }
  }

  _getKeySignalTypes() {
    return ["keydown", "keyup"];
  }

  _getKeySignalData(event) {
    return event.key;
  }

  end() {
    if (!this._started) return;
    this._removeSignals();
    this._stopAnimation();
    this._removeElement();
    delete this._started;
  }

  _removeSignals() {
    this._removeMouseSignals();
    this._removeKeySignals();
  }

  _removeMouseSignals() {
    for (const { type, callback } of this._mouseSignals)
      this._canvas.removeEventListener(type, callback);
    delete this._mouseSignals;
  }

  _removeKeySignals() {
    for (const { type, callback } of this._keySignals)
      window.removeEventListener(type, callback);
    delete this._keySignals;
  }

  _stopAnimation() {
    cancelAnimationFrame(this._animationId);
    delete this._animationId;
    this._clearCanvas();
  }

  _removeElement() {
    delete this.element;
  }

  _clearCanvas() {
    const coords = this._getCoords();
    const size = this._getMaxSize();
    this._ctx.clearRect(coords.x, coords.y, size.width, size.height);
  }
}
