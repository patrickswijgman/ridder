import { drawSprite, getDelta, getHeight, getWidth, loadSprite, loadTexture, rotateTransform, run, translateTransform } from "ridder";

let angle = 0;

run({
  width: 160,
  height: 90,

  setup: async () => {
    await loadTexture("tilemap", "textures/tilemap.png");
    loadSprite("player", "tilemap", 95, 133, 18, 18);
  },

  update: () => {
    angle += 2 * getDelta();
  },

  render: () => {
    const w = getWidth();
    const h = getHeight();
    translateTransform(w / 2, h / 2);
    rotateTransform(angle);
    drawSprite("player", -9, -18);
  },
});
