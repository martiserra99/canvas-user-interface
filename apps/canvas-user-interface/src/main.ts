import "./style.css";

import canvasUI, { Element } from "canvas-user-interface";

const ui = canvasUI.ui.new("#ui");

const frame = canvasUI.layout.new("frame-1", "frame");

const area = canvasUI.view.new("area-1", "area");

area.set("size", {
  width: { unit: "px", value: 150 },
  height: { unit: "px", value: 100 },
});

area.set("background", "#f94144");
area.set("border", { size: 10, color: "#e03b3d" });
area.set("corner", { type: "round", size: 10 });

frame.insert(area);
area.layoutParams.set("align", {
  horizontal: "middle",
  vertical: "middle",
});

ui.start(frame);

area.listeners.add("click", function (area: Element) {
  area.set("background", "#f3722c");
  area.set("border", { size: 10, color: "#db6728" });
});
