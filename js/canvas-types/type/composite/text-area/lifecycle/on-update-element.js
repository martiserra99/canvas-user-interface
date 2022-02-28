export const onUpdateElement = function (composite, inner, element) {
  element.set("size", composite.get("size"));
  element.set("background", composite.get("background"));
  element.set("border", composite.get("border"));
  element.set("corner", composite.get("corner"));
  const text = element.find("text");
  text.set("text", composite.get("text"));
  text.set("font", composite.get("font"));
  text.set("align", composite.get("align"));
  text.layoutParams.set("gravity", composite.get("align"));
  text.layoutParams.set("margin", composite.get("margin"));
};
