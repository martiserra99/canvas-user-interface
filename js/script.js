import { canvasUI } from "./canvas-ui/canvas-ui.js";

const ui = canvasUI.ui.new("#ui");

const frame = canvasUI.layout.new("frame", "frame");

const grid1 = canvasUI.layout.new("grid", "grid");
grid1.set("size", {
  width: { unit: "%", value: 75 },
  height: { unit: "px", value: 500 },
});
grid1.set("dimensions", {
  columns: [
    { count: 1, unit: "fr", length: 1 },
    { count: 1, unit: "fr", length: 2 },
  ],
  rows: [
    { count: 2, unit: "fr", length: 1 },
    { count: 1, unit: "px", length: 150 },
  ],
});
grid1.set("gap", {
  horizontal: 20,
  vertical: 50,
});
grid1.set("alignItems", {
  vertical: "middle",
  horizontal: "right",
});
grid1.set("background", "#543789");

frame.insert(grid1);

const frame1 = canvasUI.layout.new("frame", "frame");
frame1.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame1.set("background", "#BAABDA");

grid1.insert(frame1);

const frame2 = canvasUI.layout.new("frame", "frame");
frame2.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame2.set("background", "#BAABDA");

grid1.insert(frame2);

const frame3 = canvasUI.layout.new("frame", "frame");
frame3.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame3.set("background", "#BAABDA");

grid1.insert(frame3);
frame3.layoutParams.set("alignSelf", {
  vertical: "middle",
  horizontal: "middle",
});

const frame4 = canvasUI.layout.new("frame", "frame");
frame4.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame4.set("background", "#BAABDA");

grid1.insert(frame4);
frame4.layoutParams.set("alignSelf", {
  vertical: "top",
  horizontal: "left",
});

const grid2 = canvasUI.layout.new("grid", "grid");
grid2.set("size", {
  width: "auto",
  height: "auto",
});
grid2.set("dimensions", {
  columns: [{ count: 1, unit: "px", length: 200 }],
  rows: [{ count: 1, unit: "px", length: 200 }],
});
grid2.set("background", "#437");

frame.insert(grid2);
grid2.layoutParams.set("gravity", {
  horizontal: "right",
  vertical: "top",
});

const frame5 = canvasUI.layout.new("frame", "frame");
frame5.set("size", {
  width: { unit: "px", value: 100 },
  height: { unit: "px", value: 100 },
});
frame5.set("background", "#BAABDA");

grid2.insert(frame5);
frame5.layoutParams.get("margin").right = 50;

ui.start(frame);
