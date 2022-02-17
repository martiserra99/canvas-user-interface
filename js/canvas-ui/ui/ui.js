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
}
