const path = require("path");

module.exports = {
  entry: "./js/canvasui/canvasui.js",
  experiments: {
    outputModule: true,
  },
  output: {
    filename: "canvas-user-interface.js",
    path: path.resolve(__dirname, "dist"),
    library: { type: "module" },
  },
};
