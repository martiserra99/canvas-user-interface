import canvasUI from "../dist/canvasui-js.js";

const ui = canvasUI.ui.new("#ui");

const root = canvasUI.layout.new("root", "relative");

const area1 = canvasUI.view.new("area-1", "area");
const area2 = canvasUI.view.new("area-2", "area");

root.insert(area1);
root.insert(area2);

area1.layoutParams.set("attachTo", {
  top: "parent",
  right: "parent",
  bottom: "parent",
  left: "parent",
});

area2.get("size").height = { unit: "px", value: 50 };

area2.layoutParams.get("attachTo").right = { side: "left", child: "area-1" };
area2.layoutParams.get("attachTo").top = { side: "top", child: "area-1" };
area2.layoutParams.get("attachTo").bottom = { side: "bottom", child: "area-1" };
area2.layoutParams.get("margin").right = 10;

ui.start(root);
