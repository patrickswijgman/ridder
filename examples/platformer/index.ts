import {
  addVector,
  applyCameraTransform,
  copyVector,
  drawRect,
  drawText,
  fps,
  isInputDown,
  isInputPressed,
  rect,
  Rectangle,
  resetTransform,
  resolveIntersectionBetweenRectangles,
  run,
  scaleTransform,
  setCamera,
  updateCamera,
  vec,
  Vector,
} from "ridder";

// Define our entity struct (I like to use the mega struct approach instead of an entity-component-system).
type Entity = {
  position: Vector;
  velocity: Vector;
  gravity: Vector;

  body: Rectangle;
  bodyIsStatic: boolean;
  bodyIsOnGround: boolean;

  color: string;

  isPlayer: boolean;
};

function createEntity(): Entity {
  return {
    position: vec(),
    velocity: vec(),
    gravity: vec(),

    body: rect(),
    bodyIsStatic: false,
    bodyIsOnGround: false,

    color: "white",

    isPlayer: false,
  };
}

// The scene's data.
const entities: Array<Entity> = [];
const boundary = rect(0, 0, 200, 120); // The scene is this big and the camera will be constrained to this boundary.

// The constant at which gravity is applied to the entity's gravity vector.
const GRAVITY = vec(0, 0.01);

run({
  settings: {
    width: 160,
    height: 90,
    cameraSmoothing: 0.05,
  },

  setup: async () => {
    // Setup the player entity.
    const player = createEntity();
    player.position.x = 20;
    player.position.y = boundary.h - 20 - 8;
    player.body.w = 6;
    player.body.h = 8;
    player.color = "white";
    player.isPlayer = true;

    // Setup the floor entity.
    const floor = createEntity();
    floor.position.x = 0;
    floor.position.y = boundary.h - 20;
    floor.body.w = boundary.w;
    floor.body.h = 20;
    floor.bodyIsStatic = true;
    floor.color = "gray";

    // Setup the platform entity.
    const platform = createEntity();
    platform.position.x = 50;
    platform.position.y = 80;
    platform.body.w = 60;
    platform.body.h = 10;
    platform.bodyIsStatic = true;
    platform.color = "gray";

    // Setup the wall entity.
    const wall = createEntity();
    wall.position.x = 180;
    wall.position.y = 0;
    wall.body.w = 20;
    wall.body.h = boundary.h;
    wall.bodyIsStatic = true;
    wall.color = "gray";

    entities.push(player, floor, platform, wall);

    // Start the camera from the player position, otherwise the camera will start at 0,0 and will move to the player.
    setCamera(player.position.x, player.position.y);
  },

  update: () => {
    for (const e of entities) {
      if (e.isPlayer) {
        // Reset the player horizontal velocity, so if no movement key is pressed the player stands still.
        e.velocity.x = 0;

        // For available key codes you can use something like https://keycode.info and use the `event.code` value here.
        if (isInputDown("ArrowLeft")) {
          e.velocity.x -= 1;
        }
        if (isInputDown("ArrowRight")) {
          e.velocity.x += 1;
        }

        // The player may only jump when its on the ground again.
        if (isInputPressed("Space") && e.bodyIsOnGround) {
          e.velocity.y = -2;
        }
      }

      // Update each entity's physics body, if dynamic; apply its velocity and gravity to its position.
      if (!e.bodyIsStatic) {
        // Add and subtract have a third optional argument that saves you from first manually cloning and scaling
        // the vector by the delta before applying it.
        // if we don't apply delta the entity will move faster with higher FPS.
        addVector(e.gravity, GRAVITY, true);
        addVector(e.velocity, e.gravity, true);
        addVector(e.position, e.velocity, true);
      }

      // Move the body to the entity's position so we can check for collisions.
      copyVector(e.body, e.position);

      // Now that the body has moved we can check if it's colliding with another body:
      // For each body, check all other bodies for a collision, if there is a collision then this will
      // be resolved immediately and the position of the entity's body will be corrected.
      for (const other of entities) {
        // The third argument is the velocity at which the body is moving.
        // If the body is not moving it does not need to resolve collisions.
        resolveIntersectionBetweenRectangles(e.body, other.body, e.velocity);
      }

      // When the body has been moved because it resolved collisions, we can use this information to
      // determine if the body is on the ground or if it's colliding with a wall.
      if (e.body.x !== e.position.x) {
        e.velocity.x = 0;
        e.gravity.x = 0;
      }
      if (e.body.y !== e.position.y) {
        e.velocity.y = 0;
        e.gravity.y = 0;
      }

      // When the body was moved up it means it collided with the floor.
      e.bodyIsOnGround = e.body.y < e.position.y;

      // After the body has been moved and resolved collisions we can copy the body's position back to the entity.
      copyVector(e.position, e.body);

      if (e.isPlayer) {
        // Make the camera follow the player but constrain it in the scene's boundary.
        updateCamera(e.position.x, e.position.y, boundary);
      }
    }

    // Draw the physics body for each entity.
    for (const e of entities) {
      resetTransform();
      applyCameraTransform(); // Apply the camera transform for objects that are affected by the camera.
      drawRect(e.body, e.color, true);
    }

    resetTransform();
    scaleTransform(0.25, 0.25);
    // If you don't apply the camera transform you can draw UI elements for examples.
    drawText(`FPS: ${fps}`, 2, 2, "white");
  },
});
