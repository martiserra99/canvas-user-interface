import { newLayoutFrame } from "./frame/frame.js";
import { newLayoutLinear } from "./linear/linear.js";
import { newLayoutGrid } from "./grid/grid.js";

export const newLayouts = function () {
  newLayoutFrame();
  newLayoutLinear();
  newLayoutGrid();
};
