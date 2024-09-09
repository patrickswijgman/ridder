import { drawText, getHeight, getWidth, loadFont, run, scaleTransform, setFont, translateTransform } from "ridder";

run({
  width: 160,
  height: 90,

  setup: async () => {
    await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);
    setFont("default");
  },

  update: () => {},

  render: () => {
    const w = getWidth();
    const h = getHeight();
    translateTransform(w / 2, h / 2);
    scaleTransform(0.5, 0.5);
    drawText("Some text in a custom font", 0, 0, "#ff00ff", "center", "middle");
  },
});
