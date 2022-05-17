import canvasUI from "./canvasui-js.js";

const ui = canvasUI.ui.new("#ui");

const root = canvasUI.layout.new("root", "relative");

const area = canvasUI.view.new("area", "area");
const area1 = canvasUI.view.new("area", "area");

root.insert(area);
root.insert(area1);

area.layoutParams.set("attachTo", {
  top: "parent",
  right: "parent",
  bottom: "parent",
  left: "parent",
});

area1.get("size").height = { unit: "px", value: 50 };

area1.layoutParams.get("attachTo").right = { side: "left", child: area };
area1.layoutParams.get("attachTo").top = { side: "top", child: area };
area1.layoutParams.get("attachTo").bottom = { side: "bottom", child: area };
area1.layoutParams.get("margin").right = 10;

ui.start(root);
