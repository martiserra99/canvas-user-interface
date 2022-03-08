import { newCompositeImageArea } from "./image-area/image-area.js";
import { newCompositeTextArea } from "./text-area/text-area.js";
import { newCompositeSudoku } from "./sudoku/sudoku.js";

export const newComposites = function () {
  newCompositeTextArea();
  newCompositeImageArea();
  newCompositeSudoku();
};
