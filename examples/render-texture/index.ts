import { drawTexture, getDelta, getHeight, getTexture, getWidth, loadRenderTexture, loadTexture, resetTransform, rotateTransform, run, translateTransform } from "ridder";

let rotation = 0;

run({
  width: 160,
  height: 90,

  setup: async () => {
    await loadTexture("tile", "textures/tile.png");

    loadRenderTexture("red_block", 16, 16, (ctx, width, height) => {
      // See https://www.w3schools.com/html/html5_canvas.asp
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, width, height);
    });

    loadRenderTexture("floor_tiles", 90, 90, (ctx, width, height) => {
      const texture = getTexture("tile");
      for (let x = 0; x < width; x += texture.width) {
        for (let y = 0; y < height; y += texture.height) {
          ctx.drawImage(texture, x, y);
        }
      }
    });
  },

  update: () => {
    rotation += 1 * getDelta();
  },

  render: () => {
    translateTransform(35, getHeight() / 2);
    rotateTransform(rotation);
    drawTexture("red_block", -8, -8);

    resetTransform();
    drawTexture("floor_tiles", getWidth() - 90, 0);
  },
});
