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
