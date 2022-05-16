import { setupUtilsFunctions } from "./utils.js";
import { setupStartLifecycleFunctions } from "./states/start.js";
import { setupMeasureLifecycleFunctions } from "./states/measure.js";
import { setupLocateLifecycleFunctions } from "./states/locate.js";
import { setupDrawLifecycleFunctions } from "./states/draw.js";

export const setupLifecycleFunctions = function (relative) {
  setupUtilsFunctions(relative);
  setupStartLifecycleFunctions(relative);
  setupMeasureLifecycleFunctions(relative);
  setupLocateLifecycleFunctions(relative);
  setupDrawLifecycleFunctions(relative);
};
