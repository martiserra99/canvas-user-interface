export const locate = {
  alignStart(coords, length, margin = { start: 0, end: 0 }) {
    return coords.start + margin.start;
  },

  alignMiddle(coords, length, margin = { start: 0, end: 0 }) {
    return (
      coords.start +
      (coords.end - coords.start) / 2 -
      (length + margin.start + margin.end) / 2 +
      margin.start
    );
  },

  alignEnd(coords, length, margin = { start: 0, end: 0 }) {
    return coords.end - length - margin.end;
  },
};
