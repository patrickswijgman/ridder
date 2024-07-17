import { delta, getMousePosition, getSettings, polygon, run } from "ridder";

class Entity {
  hitbox = polygon();
}

const a = new Entity();
const b = new Entity();

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    const settings = getSettings();

    a.hitbox.x = settings.width / 2;
    a.hitbox.y = settings.height / 2;

    // Polygon has some convenient functions to create common shapes such as a rectangle or circle.
    // a.hitbox.toRect(-15, -15, 30, 30);
    a.hitbox.toCircle(30, 8);
    a.hitbox.setRotation(45);

    // Or you can supply the points manually in clock-wise order, this creates a triangle for example.
    // The points given are relative to the polygon's position.
    b.hitbox.set(
      0,
      0,
      [
        [-5, 5], // bottom left
        [0, -5], // top
        [5, 5], //  bottom right
      ],
      0,
    );

    // When this polygon is drawn its shape is filled instead of stroked.
    b.hitbox.fill = true;
  },

  update: () => {
    // Make this polygon follow the mouse.
    const mouse = getMousePosition(true);
    b.hitbox.position.copy(mouse);

    // And this polygon turns red when the other polygon intersects (or is contained within).
    a.hitbox.rotate(1 * delta);
    a.hitbox.color = a.hitbox.intersects(b.hitbox) ? "red" : "white";

    a.hitbox.draw();
    b.hitbox.draw();
  },
});
