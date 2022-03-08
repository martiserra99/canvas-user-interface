export const addFunctions = function (sudoku) {
  sudoku.fun("selectPosition", function (sudoku, inner, position) {
    sudoku.call("unselectPosition");
    inner.set("selected", position);
  });

  sudoku.fun("unselectPosition", function (sudoku, inner) {
    inner.set("selected", false);
  });

  sudoku.fun("getSelectedPosition", function (sudoku, inner) {
    return inner.get("selected");
  });

  sudoku.fun("setNumber", function (sudoku, inner, position, number, fixed) {
    const cell = inner.get("cells").get(position);
    cell.defined = true;
    cell.number = number;
    cell.fixed = fixed;
  });

  sudoku.fun("delNumber", function (sudoku, inner, position) {
    const cell = inner.get("cells").get(position);
    cell.defined = false;
    cell.number = null;
    cell.fixed = null;
  });

  sudoku.fun("getNumber", function (sudoku, inner, position) {
    return inner.get("cells").get(position).number;
  });

  sudoku.fun("isFixed", function (sudoku, inner, position) {
    return inner.get("cells").get(position).fixed;
  });
};
