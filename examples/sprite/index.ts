import { drawSprite, getDelta, getHeight, getWidth, loadSprite, loadTexture, rotateTransform, run, translateTransform } from "ridder";

const enum TextureId {
  TILEMAP,
}

const enum SpriteId {
  PLAYER,
}

let angle = 0;

run({
  width: 160,
  height: 90,

  setup: async () => {
    await loadTexture(TextureId.TILEMAP, "textures/tilemap.png");
    loadSprite(SpriteId.PLAYER, TextureId.TILEMAP, 95, 133, 18, 18);
  },

  update: () => {
    const w = getWidth();
    const h = getHeight();

    angle += 2 * getDelta();

    translateTransform(w / 2, h / 2);
    rotateTransform(angle);
    drawSprite(SpriteId.PLAYER, -9, -18);
  },
});
