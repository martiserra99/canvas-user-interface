import canvasUI from "./canvasui-js.js";

const ui = canvasUI.ui.new("#ui");

const root = canvasUI.layout.new("root", "frame");

const area = canvasUI.view.new("area", "area");

area.set("background", "#767");

area.set("border", { size: 5, color: "#000" });

area.set("corner", { type: "round", size: 10 });

root.insert(area);

area.layoutParams.set("align", {
  horizontal: "middle",
  vertical: "middle",
});

area.listeners.add("click", function (area) {
  area.set("background", "#a768");
});

ui.start(root);
