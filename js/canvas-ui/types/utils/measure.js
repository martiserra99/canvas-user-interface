export const measure = {
  length(desired, max, auto) {
    let result = desired === null ? auto() : desired;
    if (result > max) result = max;
    if (result < 0) result = 0;
    return result;
  },

  availableLength(desired, max) {
    if (desired === null) return max;
    if (desired < max) return desired;
    return max;
  },

  desiredLength(length, max) {
    if (length === "auto") return null;
    const { unit, value } = length;
    return unit === "px" ? value : max * (value / 100);
  },

  size(desired, max, auto) {
    return {
      width: this.length(desired.width, max.width, auto?.width),
      height: this.length(desired.height, max.height, auto?.height),
    };
  },

  availableSize(desired, max) {
    return {
      width: this.availableLength(desired.width, max.width),
      height: this.availableLength(desired.height, max.height),
    };
  },

  desiredSize(size, max) {
    return {
      width: this.desiredLength(size.width, max.width),
      height: this.desiredLength(size.height, max.height),
    };
  },

  textSize(text, font) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.font = `${font.weight} ${font.size}px ${font.family}`;
    return { width: ctx.measureText(text).width, height: font.size };
  },
};
