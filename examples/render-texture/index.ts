import {
  delta,
  drawTexture,
  getSettings,
  getTexture,
  loadRenderTexture,
  loadTexture,
  resetTransform,
  rotateTransform,
  run,
  translateTransform,
} from "ridder";

let rotation = 0;

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    await loadTexture("tile", "textures/tile.png");

    // Example A: draw a simple shape.
    loadRenderTexture(
      "red_block",
      16, // width
      16, // height,
      (ctx, width, height) => {
        // Draw on this texture using the canvas API.
        // https://www.w3schools.com/html/html5_canvas.asp
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, width, height);
      },
    );

    // Example B: create a repeated texture.
    // This is useful for creating a floor or wall texture and is more efficient than drawing each tile individually.
    loadRenderTexture("floor_tiles", 90, 90, (ctx, width, height) => {
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
    drawTexture("red_block", -8, -8); // When translating the transform matrix you can pass the x and y here as the center of rotation.

    resetTransform(); // Important to reset the transform matrix, otherwise this drawing will be drawn relative to the previous one.
    drawTexture("floor_tiles", settings.width - 90, 0);
  },
});
