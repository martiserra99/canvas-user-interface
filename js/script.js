import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const root = canvasUI.layout.new("root", "linear");

root.set("gap", 20);
root.set("alignContent", "start");
root.set("alignItems", "start");

const textArea = canvasUI.composite.new("textArea", "textArea");
const textArea2 = canvasUI.composite.new("textArea2", "textArea");

root.insert(textArea);
root.insert(textArea2);

textArea.layoutParams.get("margin").left = 50;
textArea.layoutParams.set("alignSelf", "end");

ui.start(root);
