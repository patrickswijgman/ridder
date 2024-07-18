import { getSettings, loadFont, rect, run, text } from "ridder";

const line = rect();
const label = text();

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    // Tip: use "default" as the font ID to have every text component use this font by default.
    // The last argument sets the height of each line, increase this number to increase the
    // spacing between each line.
    await loadFont("default", "fonts/pixelmix.ttf", "pixelmix", 8, 12);

    const settings = getSettings();

    label.text = "Sample text\nText On a new line\nAnd another line";
    label.x = settings.width / 2;
    label.y = settings.height / 2;
    label.align = "center";
    label.baseline = "middle";
    label.scale.set(0.5, 0.5);

    line.set(0, settings.height / 2, settings.width, 1);
    line.color = "red";
    line.fill = true;
  },

  update: () => {
    line.draw();
    label.draw();
  },
});
