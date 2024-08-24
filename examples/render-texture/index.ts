import { createRenderTexture, delta, drawTexture, getSettings, getTexture, loadTexture, resetTransform, rotateTransform, run, translateTransform } from "ridder";

let rotation = 0;

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    await loadTexture("tile", "textures/tile.png");

    createRenderTexture("red_block", 16, 16, (ctx, width, height) => {
      // See https://www.w3schools.com/html/html5_canvas.asp
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, width, height);
    });

    createRenderTexture("floor_tiles", 90, 90, (ctx, width, height) => {
      const tile = getTexture("tile");

      for (let x = 0; x < width; x += tile.width) {
        for (let y = 0; y < height; y += tile.height) {
          ctx.drawImage(tile, x, y);
        }
      }
    });
  },

  update: () => {
    const settings = getSettings();

    rotation += 1 * delta;

    translateTransform(35, settings.height / 2);
    rotateTransform(rotation);
    drawTexture("red_block", -8, -8);

    resetTransform();
    drawTexture("floor_tiles", settings.width - 90, 0);
  },
});
