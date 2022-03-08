export const onCreate = function (composite, inner) {
  inner.set("select", false);
  inner.set("cells", getCellsObj());
};

const getCellsObj = function () {
  const matrix = [];

  for (let column = 0; column < 9; column++) {
    matrix.push([]);
    for (let row = 0; row < 9; row++)
      matrix[column].push({
        defined: false,
        number: null,
        fixed: null,
        textArea: null,
      });
  }

  return {
    matrix,
    get(position) {
      return this.matrix[position.column][position.row];
    },
  };
};
