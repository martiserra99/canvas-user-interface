import { canvasUI } from "../../../../canvas-ui/canvas-ui.js";

export const newCompositeImageArea = function () {
  const imageArea = canvasUI.composite.newType("imageArea");

  imageArea.set("size", { width: "auto", height: "auto" });
  imageArea.set("background", "rgba(0,0,0,0)");
  imageArea.set("border", { color: "#000", size: 0 });
  imageArea.set("corner", { type: "cut", size: 0 });
  imageArea.set("imageSize", { width: 100, height: 100 });
  imageArea.set("imageSrc", "");
  imageArea.set("align", { vertical: "middle", horizontal: "middle" });
  imageArea.set("margin", { top: 0, right: 0, bottom: 0, left: 0 });

  imageArea.lifecycle.set("getElement", function (imageArea) {
    const frame = canvasUI.layout.new("frame", "frame");
    const image = canvasUI.view.new("image", "image");
    frame.insert(image);
    return frame;
  });

  imageArea.lifecycle.set("updateElement", function (imageArea, frame) {
    frame.set("size", imageArea.get("size"));
    frame.set("background", imageArea.get("background"));
    frame.set("border", imageArea.get("border"));
    frame.set("corner", imageArea.get("corner"));
    const image = frame.find("image");
    image.set("size", imageArea.get("imageSize"));
    image.set("src", imageArea.get("imageSrc"));
    image.layoutParams.set("align", imageArea.get("align"));
    image.layoutParams.set("margin", imageArea.get("margin"));
  });
};
