import { drawTexture, getDelta, getHeight, getTexture, getWidth, loadRenderTexture, loadTexture, resetTransform, rotateTransform, run, translateTransform } from "ridder";

const enum TextureId {
  TILE,
  RED_BLOCK,
  FLOOR_TILES,
}

let rotation = 0;

run({
  width: 160,
  height: 90,

  setup: async () => {
    await loadTexture(TextureId.TILE, "textures/tile.png");

    loadRenderTexture(TextureId.RED_BLOCK, 16, 16, (ctx, width, height) => {
      // See https://www.w3schools.com/html/html5_canvas.asp
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, width, height);
    });

    loadRenderTexture(TextureId.FLOOR_TILES, 90, 90, (ctx, width, height) => {
      const texture = getTexture(TextureId.TILE);
      for (let x = 0; x < width; x += texture.width) {
        for (let y = 0; y < height; y += texture.height) {
          ctx.drawImage(texture, x, y);
        }
      }
    });
  },

  update: () => {
    rotation += 1 * getDelta();

    translateTransform(35, getHeight() / 2);
    rotateTransform(rotation);
    drawTexture(TextureId.RED_BLOCK, -8, -8);

    resetTransform();
    drawTexture(TextureId.FLOOR_TILES, getWidth() - 90, 0);
  },
});
