import {
  delta,
  getSettings,
  getTexture,
  loadRenderTexture,
  loadTexture,
  run,
  texture,
} from "ridder";

class Entity {
  texture = texture();
}

const block = new Entity();
const floor = new Entity();

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    const settings = getSettings();

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

      for (let x = 0; x < width; x += 18) {
        for (let y = 0; y < height; y += 18) {
          ctx.drawImage(tile, x, y);
        }
      }
    });

    // The texture object on the entity holds a reference to the texture you have loaded with 'loadRenderTexture'.
    block.texture.id = "red_block";
    block.texture.pivot.set(8, 8);
    block.texture.position.set(30, settings.height / 2);

    floor.texture.id = "floor_tiles";
    floor.texture.position.set(settings.width - 90, 0);
  },

  update: () => {
    floor.texture.draw();

    block.texture.angle += 2 * delta;
    block.texture.draw();
  },
});
