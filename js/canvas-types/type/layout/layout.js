import { newLayoutFrame } from "./frame/frame.js";
import { newLayoutGrid } from "./grid/grid.js";

export const newLayouts = function () {
  newLayoutFrame();
  newLayoutGrid();
};
