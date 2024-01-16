type DesiredLength = 'auto' | { unit: string; value: number };
type DesiredSize = { width: DesiredLength; height: DesiredLength };

type Font = { weight: string; size: number; family: string };

const measure = {
  length(desired: null | number, max: number, auto = () => 0) {
    let result = desired === null ? auto() : desired;
    if (result > max) result = max;
    if (result < 0) result = 0;
    return result;
  },

  availableLength(desired: number | null, max: number) {
    if (desired === null) return max;
    if (desired < max) return desired;
    return max;
  },

  desiredLength(length: DesiredLength, max: number) {
    if (length === 'auto') return null;
    const { unit, value } = length;
    return unit === 'px' ? value : max * (value / 100);
  },

  size(
    desired: { width: number | null; height: number | null },
    max: { width: number; height: number },
    auto = { width: () => 0, height: () => 0 }
  ) {
    return {
      width: this.length(desired.width, max.width, auto.width),
      height: this.length(desired.height, max.height, auto.height),
    };
  },

  availableSize(
    desired: { width: number | null; height: number | null },
    max: { width: number; height: number }
  ) {
    return {
      width: this.availableLength(desired.width, max.width),
      height: this.availableLength(desired.height, max.height),
    };
  },

  desiredSize(size: DesiredSize, max: { width: number; height: number }) {
    return {
      width: this.desiredLength(size.width, max.width),
      height: this.desiredLength(size.height, max.height),
    };
  },

  textSize(text: string, font: Font) {
    const ctx = document.createElement('canvas').getContext('2d')!;
    ctx.font = `${font.weight} ${font.size}px ${font.family}`;
    return { width: ctx.measureText(text).width, height: font.size };
  },
};

export default measure;
