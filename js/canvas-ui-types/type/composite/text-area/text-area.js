import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

export const newCompositeTextArea = function () {
  const textArea = canvasUI.composite.newType("textArea");

  textArea.set("size", { width: "auto", height: "auto" });
  textArea.set("background", "rgba(0,0,0,0)");
  textArea.set("border", { color: "#000", size: 0 });
  textArea.set("corner", { type: "cut", size: 0 });
  textArea.set("text", "Text");
  textArea.set("font", { size: 16, family: "Courier New", weight: 400 });
  textArea.set("color", "#000");
  textArea.set("align", { vertical: "middle", horizontal: "middle" });
  textArea.set("margin", { top: 0, right: 0, bottom: 0, left: 0 });

  textArea.lifecycle.set("getElement", function (textArea) {
    const frame = canvasUI.layout.new("frame", "frame");
    const text = canvasUI.view.new("text", "text");
    frame.insert(text);
    return frame;
  });

  textArea.lifecycle.set("updateElement", function (textArea, frame) {
    frame.set("size", textArea.get("size"));
    frame.set("background", textArea.get("background"));
    frame.set("border", textArea.get("border"));
    frame.set("corner", textArea.get("corner"));
    const text = frame.find("text");
    text.set("text", textArea.get("text"));
    text.set("font", textArea.get("font"));
    text.set("color", textArea.get("color"));
    text.set("align", textArea.get("align"));
    text.layoutParams.set("align", textArea.get("align"));
    text.layoutParams.set("margin", textArea.get("margin"));
  });
};
