type Coords = { start: number; end: number };

const locate = {
  alignStart(coords: Coords, _: number, margin = { start: 0, end: 0 }) {
    return coords.start + margin.start;
  },

  alignMiddle(coords: Coords, length: number, margin = { start: 0, end: 0 }) {
    return (
      coords.start +
      (coords.end - coords.start) / 2 -
      (length + margin.start + margin.end) / 2 +
      margin.start
    );
  },

  alignEnd(coords: Coords, length: number, margin = { start: 0, end: 0 }) {
    return coords.end - length - margin.end;
  },
};

export default locate;
