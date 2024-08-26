import { drawText, loadFont, run, scaleTransform, settings, translateTransform } from "ridder";

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    // Tip: use "default" as the font ID to have every text component use this font by default.
    await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8);
  },

  update: () => {
    translateTransform(settings.width / 2, settings.height / 2);
    scaleTransform(0.5, 0.5);
    drawText("Some text in a custom font", 0, 0, "#ff00ff", "center", "middle");
  },
});
