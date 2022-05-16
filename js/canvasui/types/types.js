import { newViews } from "./class/view/view.js";
import { newLayouts } from "./class/layout/layout.js";
import { newComposites } from "./class/composite/composite.js";

export const newTypes = function () {
  newViews();
  newLayouts();
  newComposites();
};
