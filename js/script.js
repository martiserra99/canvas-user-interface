import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const frame = canvasUI.layout.new("frame", "frame");

const linear1 = canvasUI.layout.new("linear", "linear");
linear1.set("size", {
  width: { unit: "%", value: 100 },
  height: { unit: "px", value: 200 },
});
linear1.set("direction", "horizontal");
linear1.set("gap", 20);
linear1.set("gravityContent", "start");
linear1.set("background", "#FF9292");

frame.insert(linear1);

const frame1 = canvasUI.layout.new("frame", "frame");
frame1.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame1.set("background", "#BAABDA");

linear1.insert(frame1);

const frame2 = canvasUI.layout.new("frame", "frame");
frame2.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame2.set("background", "#643217");

linear1.insert(frame2);
frame2.layoutParams.set("alignSelf", "start");

const linear2 = canvasUI.layout.new("linear", "linear");
linear2.set("size", {
  width: { unit: "px", value: 1200 },
  height: { unit: "%", value: 30 },
});
linear2.set("direction", "reverse-horizontal");
linear2.set("gap", 20);
linear2.set("gravityContent", "end");
linear2.set("background", "#D77FA1");

frame.insert(linear2);
linear2.layoutParams.get("margin").top = 200;

const frame3 = canvasUI.layout.new("frame", "frame");
frame3.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame3.set("background", "#BAABDA");

linear2.insert(frame3);

const frame4 = canvasUI.layout.new("frame", "frame");
frame4.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame4.set("background", "#643217");

linear2.insert(frame4);
frame4.layoutParams.set("alignSelf", "end");

const linear3 = canvasUI.layout.new("linear", "linear");
linear3.set("size", {
  width: "auto",
  height: "auto",
});
linear3.set("direction", "vertical");
linear3.set("gap", 20);
linear3.set("background", "#432982");

frame.insert(linear3);
linear3.layoutParams.get("margin").top = 400;

const frame5 = canvasUI.layout.new("frame", "frame");
frame5.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame5.set("background", "#BAABDA");

linear3.insert(frame5);
frame5.layoutParams.set("margin", { top: 50, left: 50, right: 20, bottom: 20 });

const frame6 = canvasUI.layout.new("frame", "frame");
frame6.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame6.set("background", "#BAABDA");

linear3.insert(frame6);

ui.start(frame);
