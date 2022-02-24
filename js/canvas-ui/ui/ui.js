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
    this.element.onStartUpdate();
    this.element.onMeasure(this._getMaxSize());
    this.element.onLocate(this._getCoords());
    this.element.onDraw(this._ctx);
    this.element.onEndUpdate();
  }

  _getMaxSize() {
    return { width: this._width, height: this._height };
  }

  _getCoords() {
    return { x: 0, y: 0 };
  }

  end() {
    if (!this._started) return;
    this._stopAnimation();
    this._removeElement();
    delete this._started;
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
