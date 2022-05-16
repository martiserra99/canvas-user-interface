import { setupStartLifecycleFunctions } from "./states/start.js";
import { setupMeasureLifecycleFunctions } from "./states/measure.js";
import { setupLocateLifecycleFunctions } from "./states/locate.js";
import { setupDrawLifecycleFunctions } from "./states/draw.js";

export const setupLifecycleFunctions = function (linear) {
  setupStartLifecycleFunctions(linear);
  setupMeasureLifecycleFunctions(linear);
  setupLocateLifecycleFunctions(linear);
  setupDrawLifecycleFunctions(linear);
};
