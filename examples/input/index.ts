import { InputCode, drawText, getHeight, getMousePosition, getWidth, isInputDown, isInputPressed, isInputReleased, run, scaleTransform, translateTransform } from "ridder";

run({
  width: 160,
  height: 90,

  setup: async () => {},

  update: () => {
    if (isInputPressed(InputCode.KEY_ENTER)) {
      console.log("You have pressed the enter key");
    }

    if (isInputDown(InputCode.KEY_ENTER)) {
      console.log("You are continuously pressing down the enter key");
    }

    if (isInputReleased(InputCode.KEY_ENTER)) {
      console.log("You have released the enter key");
    }
  },

  render: () => {
    const w = getWidth();
    const h = getHeight();
    const mouse = getMousePosition();

    translateTransform(w / 2, h / 2);
    scaleTransform(0.25, 0.25);
    drawText("See the console for input information", 0, 0, "#ff00ff", "center", "middle");

    translateTransform(0, 20);
    drawText(`Mouse position on canvas: ${mouse.x.toFixed()}, ${mouse.y.toFixed()}`, 0, 0, "#ff00ff", "center", "middle");
  },
});
