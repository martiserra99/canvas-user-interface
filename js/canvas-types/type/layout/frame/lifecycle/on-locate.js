export const onLocate = function (layout, inner, coords) {
  inner.set("coordsNoBorder", getCoordsNoBorder(layout, coords));
};

const getCoordsNoBorder = (layout, coords) => ({
  x: coords.x + layout.get("border").size,
  y: coords.y + layout.get("border").size,
});
