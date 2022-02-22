import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const text = canvasUI.view.new("text", "text");

ui.start(text);
