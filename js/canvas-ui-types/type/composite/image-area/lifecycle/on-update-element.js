export const onUpdateElement = function (composite, inner, element) {
  element.set("size", composite.get("size"));
  element.set("background", composite.get("background"));
  element.set("border", composite.get("border"));
  element.set("corner", composite.get("corner"));
  const image = element.find("image");
  image.set("size", composite.get("imageSize"));
  image.set("src", composite.get("imageSrc"));
  image.layoutParams.set("gravity", composite.get("align"));
  image.layoutParams.set("margin", composite.get("margin"));
};
