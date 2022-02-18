export const fromMapToIterator = function (map) {
  return {
    array: [...map],
    next() {
      if (this.array.length === 0) return { done: true };
      return { done: false, value: this.array.shift() };
    },
  };
};

export const clone = function (data) {
  return JSON.parse(JSON.stringify(data));
};

export const removeFromArray = function (array, element) {
  const i = array.findIndex((elem) => elem === element);
  if (i === -1) return false;
  array.splice(i, 1);
  return true;
};
