import {
  body,
  delta,
  getSettings,
  isInputDown,
  isInputPressed,
  rect,
  run,
  updateCamera,
  vec,
} from "ridder";

class Entity {
  // The Body class already contains some common physics components like a position and velocity vector,
  // so no need to define these on the entity as we can already use these vectors instead.
  body = body();
}

class Scene {
  entities: Array<Entity> = [];
  boundary = rect();
}

const scene = new Scene();

const player = new Entity();
const floor = new Entity();
const platform = new Entity();
const wall = new Entity();

run({
  settings: {
    width: 160,
    height: 90,
    gravity: vec(0, 0.01),
    gravityMax: 1,
    background: "#1D263B",
    cameraSmoothing: 0.05,
  },

  setup: async () => {
    const settings = getSettings();

    // Setup the scene.
    scene.entities.push(player, floor, platform, wall);
    scene.boundary.set(0, 0, 200, settings.height);

    // Setup the player entity.
    player.body.set(20, 70, 6, 8);
    player.body.color = "#A0EADE";
    player.body.fill = true;

    // Setup the floor entity.
    floor.body.set(0, 70, scene.boundary.w, 20);
    floor.body.isStatic = true;
    floor.body.color = "#5C6784";

    // Setup the platform entity.
    platform.body.set(50, 50, 30, 10);
    platform.body.isStatic = true;
    platform.body.color = "#5C6784";

    // Setup the wall entity.
    wall.body.set(150, 0, 50, 70);
    wall.body.isStatic = true;
    wall.body.color = "#AA5042";
  },

  update: () => {
    // Reset the player velocity, so if no movement key is pressed the player stands still.
    player.body.velocity.x = 0;

    // For available key codes you can use something like https://keycode.info and use the `event.code` value here.
    if (isInputDown("ArrowLeft")) {
      player.body.velocity.x -= 1 * delta;
    }
    if (isInputDown("ArrowRight")) {
      player.body.velocity.x += 1 * delta;
    }

    // The player may only jump when its on the ground again.
    // However you could not check the isOnGround flag and implement something like double jump!
    if (isInputPressed("Space") && player.body.isOnGround) {
      player.body.velocity.y = -2;
    }

    for (const e of scene.entities) {
      // Update each entity's physics body, this will apply its velocity and gravity to its position.
      e.body.update();

      // Now that the body has moved we can check if it's colliding with another body:
      // For each body, check all other bodies for a collision, if there is a collision then this will
      // be resolved immediately and the position of the entity's body will be corrected.
      for (const other of scene.entities) {
        e.body.resolveCollision(other.body);
      }
    }

    // Make the camera follow the player but constrain it in the scene's boundary.
    updateCamera(player.body.x, player.body.y, scene.boundary);

    // Draw the physics body for each entity.
    for (const e of scene.entities) {
      e.body.draw();
    }
  },
});
