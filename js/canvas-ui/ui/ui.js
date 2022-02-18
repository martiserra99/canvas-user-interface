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

  start(drawable) {
    this._insertDrawable(drawable);
    this._startAnimation();
  }

  _insertDrawable(drawable) {
    drawable.insertToUI(this);
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
    this.drawable.onStartUpdateUI();
    this.drawable.onSetSize(this._getMaxSize());
    this.drawable.onSetCoords(this._getCoords());
    this.drawable.onDraw(this._ctx);
    this.drawable.onEndUpdateUI();
  }

  _clearCanvas() {
    const coords = this._getCoords();
    const size = this._getMaxSize();
    this._ctx.clearRect(coords.x, coords.y, size.width, size.height);
  }

  _getMaxSize() {
    return { width: this._width, height: this._height };
  }

  _getCoords() {
    return { x: 0, y: 0 };
  }
}
