# canvasui-js.js

**Canvas UI** is a JavaScript library used to build user interfaces using the canvas html element. It aims to manage all the complexities of using the canvas to let you develop anything you want as easy as possible.

The way it works is by providing you a way to build UI elements (ex: image), place them as you want (ex: aligned in the middle) and interact with them to make them do something (ex: move when key pressed).

The following code is a minimal example to demonstrate how it is used:

```javascript
import canvasUI from "./canvasui.js";
const ui = canvasUI.ui.new("#ui");
const root = canvasUI.layout.new("root", "frame");
const text = canvasUI.view.new("text-1", "text");
text.set("text", "Hello World!");
text.get("font").size = 30;
root.insert(text);
text.layoutParams.set("align", {
  horizontal: "middle",
  vertical: "middle",
});
ui.start(root);
```
