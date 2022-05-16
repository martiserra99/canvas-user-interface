const path = require("path");

module.exports = {
  entry: "./js/canvas-ui/canvas-ui.js",
  experiments: {
    outputModule: true,
  },
  output: {
    filename: "canvas-ui.js",
    path: path.resolve(__dirname, "js"),
    library: { type: "module" },
  },
};
