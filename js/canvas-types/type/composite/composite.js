import { newCompositeImageArea } from "./image-area/image-area.js";
import { newCompositeTextArea } from "./text-area/text-area.js";

export const newComposites = function () {
  newCompositeTextArea();
  newCompositeImageArea();
};
