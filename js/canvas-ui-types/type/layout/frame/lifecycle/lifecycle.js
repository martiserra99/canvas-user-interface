import { setupMeasureLifecycleFunctions } from "./states/measure.js";
import { setupLocateLifecycleFunctions } from "./states/locate.js";
import { setupDrawLifecycleFunctions } from "./states/draw.js";

export const setupLifecycleFunctions = function (frame) {
  setupMeasureLifecycleFunctions(frame);
  setupLocateLifecycleFunctions(frame);
  setupDrawLifecycleFunctions(frame);
};
