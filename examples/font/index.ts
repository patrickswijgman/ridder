import { drawText, getSettings, loadFont, run, scaleTransform, setFont, translateTransform } from "ridder";

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);
    setFont("default");
  },

  update: () => {
    const settings = getSettings();
    translateTransform(settings.width / 2, settings.height / 2);
    scaleTransform(0.5, 0.5);
    drawText("Some text in a custom font", 0, 0, "#ff00ff", "center", "middle");
  },
});
