import { newLayoutFrame } from "./frame/frame.js";
import { newLayoutLinear } from "./linear/linear.js";
import { newLayoutGrid } from "./grid/grid.js";
import { newLayoutRelative } from "./relative/relative.js";

export const newLayouts = function () {
  newLayoutFrame();
  newLayoutLinear();
  newLayoutGrid();
  newLayoutRelative();
};
