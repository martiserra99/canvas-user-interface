export const onUpdateElement = function (composite, inner, element) {
  const grid = element.find("grid");
  const gridTop = element.find("grid-top");
  grid.get("squares").size = composite.get("size") / 9;
  grid.get("lines").color = composite.get("lines").color;
  grid.set("background", composite.get("background"));

  gridTop.get("squares").size = composite.get("size") / 3;
  gridTop.get("lines").color = composite.get("lines").color;
  gridTop.get("lines").outside = composite.get("lines").outside;

  const cellSize = composite.get("size") / 9;
  const textSize = composite.get("text").size;
  const textColor = composite.get("text").color;

  const cells = inner.get("cells");

  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const cell = cells.get({ column, row });
      const { defined, number, fixed, textArea } = cell;
      textArea.set("size", {
        width: { unit: "px", value: cellSize },
        height: { unit: "px", value: cellSize },
      });
      textArea.get("font").size = textSize;
      textArea.get("font").color = textColor;
      textArea.get("border").size = 0;

      if (defined) {
        textArea.set("text", `${number}`);
        textArea.get("font").weight = fixed ? 700 : 400;
      } else {
        textArea.set("text", "");
        textArea.get("font").weight = 400;
      }
    }
  }

  const selected = inner.get("selected");
  if (selected) cells.get(selected).textArea.get("border").size = 3;
};
