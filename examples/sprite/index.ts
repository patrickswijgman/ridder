import { createSprite, delta, drawSprite, getSettings, loadTexture, rotateTransform, run, translateTransform } from "ridder";

let angle = 0;

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    await loadTexture("tilemap", "textures/tilemap.png");

    createSprite("player", "tilemap", 95, 133, 18, 18);
  },

  update: () => {
    const settings = getSettings();

    angle += 2 * delta;

    translateTransform(settings.width / 2, settings.height / 2);
    rotateTransform(angle);
    drawSprite("player", -9, -18);
  },
});
