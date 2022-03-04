import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const relative = canvasUI.layout.new("relative", "relative");

const frame1 = canvasUI.layout.new("frame", "frame");
frame1.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame1.set("background", "#BAABDA");

relative.insert(frame1);
frame1.layoutParams.get("margin").top = 20;
frame1.layoutParams.get("margin").right = 20;

const frame2 = canvasUI.layout.new("frame", "frame");
frame2.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame2.set("background", "#BAABDA");

relative.insert(frame2);
frame2.layoutParams.get("attachTo").right = "parent";
frame2.layoutParams.get("attachTo").bottom = "parent";

const frame3 = canvasUI.layout.new("frame", "frame");
frame3.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame3.set("background", "#BAABDA");

relative.insert(frame3);
frame3.layoutParams.get("attachTo").left = frame1;
frame3.layoutParams.get("margin").left = 20;

const frame4 = canvasUI.layout.new("frame", "frame");
frame4.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame4.set("background", "#765");

relative.insert(frame4);
frame4.layoutParams.get("attachTo").left = frame1;
frame4.layoutParams.get("attachTo").right = frame2;
frame4.layoutParams.get("bias").horizontal = 10;
frame4.layoutParams.get("margin").left = 100;

const frame5 = canvasUI.layout.new("frame", "frame");
frame5.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame5.set("background", "#000");

relative.insert(frame5);
frame5.layoutParams.get("margin").top = 20;
frame5.layoutParams.get("margin").right = 20;
frame5.layoutParams.set("z-index", -1);

ui.start(relative);
