import { canvasUI } from "./canvas-ui/canvas-ui.js";
import { newDrawableTypes } from "./canvas-types/canvas-types.js";

newDrawableTypes();

const ui = canvasUI.ui.new("#ui");

const text = canvasUI.view.new("text", "text");

ui.start(text);
