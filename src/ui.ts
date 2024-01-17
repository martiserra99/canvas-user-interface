import Element from './element/generic/element';

import { Size, Coords } from './types';

type MouseSignal = { type: string; callback: (event: MouseEvent) => void };
type KeySignal = { type: string; callback: (event: KeyboardEvent) => void };

const dpr = window.devicePixelRatio || 1;

class UI {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  private width!: number;
  private height!: number;

  private resizeListener!: EventListener;

  private started: boolean = false;
  private animationId: number | null = null;

  private mouseSignals: MouseSignal[] = [];
  private keySignals: KeySignal[] = [];

  element: Element | null = null;

  constructor(canvas: string | HTMLCanvasElement) {
    this.setCanvas(canvas);
    this.setCanvasSize();
    this.setCanvasSizeOnResize();
  }

  private setCanvas(canvas: string | HTMLCanvasElement) {
    if (typeof canvas === 'string') {
      this.canvas = document.querySelector(canvas) as HTMLCanvasElement;
    } else {
      this.canvas = canvas;
    }
    this.ctx = this.canvas.getContext('2d')!;
  }

  private setCanvasSize() {
    const { width, height } = this.canvas.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  private setCanvasSizeOnResize() {
    this.resizeListener = this.setCanvasSize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  start(element: Element) {
    if (this.started) this.end();
    this.insertElement(element);
    this.startAnimation();
    this.setupSignals();
    this.started = true;
  }

  private insertElement(element: Element) {
    element.insertToUI(this);
  }

  private startAnimation() {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.updateUI();
    };
    animate();
  }

  private updateUI() {
    this.clearCanvas();
    this.element!.start();
    this.element!.measure(this.getMaxSize());
    this.element!.locate(this.getCoords());
    this.element!.draw(this.ctx);
    this.element!.end();
  }

  private getMaxSize(): Size {
    return { width: this.width, height: this.height };
  }

  private getCoords(): Coords {
    return { x: 0, y: 0 };
  }

  setupSignals() {
    this.setupMouseSignals();
    this.setupKeySignals();
  }

  setupMouseSignals() {
    const types = this.getMouseSignalTypes();
    for (const type of types) {
      const callback = (event: MouseEvent) => {
        const data = this.getMouseSignalData(event);
        this.element!.signal({ type, data });
      };
      this.mouseSignals.push({ type, callback });
      this.canvas.addEventListener(type, callback as EventListener);
    }
  }

  private getMouseSignalTypes() {
    return ['mousedown', 'mouseup', 'mousemove', 'mouseenter', 'mouseleave'];
  }

  private getMouseSignalData(event: MouseEvent) {
    return { x: event.clientX, y: event.clientY };
  }

  setupKeySignals() {
    const types = this.getKeySignalTypes();
    for (const type of types) {
      const callback = (event: KeyboardEvent) => {
        if (event.repeat) return;
        const data = this.getKeySignalData(event);
        this.element!.signal({ type, data });
      };
      this.keySignals.push({ type, callback });
      window.addEventListener(type, callback as EventListener);
    }
  }

  private getKeySignalTypes() {
    return ['keydown', 'keyup'];
  }

  private getKeySignalData(event: KeyboardEvent) {
    return event.key;
  }

  end() {
    if (!this.started) return;
    this.removeSignals();
    this.stopAnimation();
    this.removeElement();
    this.started = false;
  }

  private removeSignals() {
    this.removeMouseSignals();
    this.removeKeySignals();
  }

  private removeMouseSignals() {
    for (const { type, callback } of this.mouseSignals)
      this.canvas.removeEventListener(type, callback as EventListener);
    this.mouseSignals = [];
  }

  private removeKeySignals() {
    for (const { type, callback } of this.keySignals)
      window.removeEventListener(type, callback as EventListener);
    this.keySignals = [];
  }

  private stopAnimation() {
    cancelAnimationFrame(this.animationId!);
    this.animationId = null;
    this.clearCanvas();
  }

  removeElement() {
    this.element = null;
  }

  private clearCanvas() {
    const coords = this.getCoords();
    const size = this.getMaxSize();
    this.ctx.clearRect(coords.x, coords.y, size.width, size.height);
  }
}

export default UI;
