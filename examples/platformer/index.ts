import {
  InputCode,
  Rectangle,
  Vector,
  addVectorScaled,
  applyCameraTransform,
  delta,
  drawRect,
  drawText,
  fps,
  getIntersectionBetweenRectangles,
  isInputDown,
  isInputPressed,
  rect,
  resetTransform,
  resetVector,
  run,
  scaleTransform,
  setCamera,
  updateCamera,
  vec,
} from "ridder";

const GRAVITY = vec(0, 0.01);

type Entity = {
  isPlayer: boolean;

  position: Vector;
  velocity: Vector;
  gravity: Vector;

  body: Rectangle;
  bodyIntersectionResult: Vector;
  bodyIsStatic: boolean;
  bodyIsOnGround: boolean;

  color: string;
};

function createEntity(): Entity {
  return {
    isPlayer: false,

    position: vec(),
    velocity: vec(),
    gravity: vec(),

    body: rect(),
    bodyIntersectionResult: vec(),
    bodyIsStatic: false,
    bodyIsOnGround: false,

    color: "white",
  };
}

const entities: Array<Entity> = [];
const boundary = rect(0, 0, 200, 120);

run({
  settings: {
    width: 160,
    height: 90,
    background: "#1e1e1e",
    cameraSmoothing: 0.05,
  },

  setup: async () => {
    const player = createEntity();
    player.position.x = 20;
    player.position.y = boundary.h - 20 - 8;
    player.body.w = 6;
    player.body.h = 8;
    player.color = "white";
    player.isPlayer = true;

    const floor = createEntity();
    floor.position.x = 0;
    floor.position.y = boundary.h - 20;
    floor.body.w = boundary.w;
    floor.body.h = 20;
    floor.bodyIsStatic = true;
    floor.color = "gray";

    const platform = createEntity();
    platform.position.x = 50;
    platform.position.y = 80;
    platform.body.w = 60;
    platform.body.h = 10;
    platform.bodyIsStatic = true;
    platform.color = "gray";

    const wall = createEntity();
    wall.position.x = 180;
    wall.position.y = 0;
    wall.body.w = 20;
    wall.body.h = boundary.h;
    wall.bodyIsStatic = true;
    wall.color = "gray";

    entities.push(player, floor, platform, wall);

    setCamera(player.position.x, player.position.y);
  },

  update: () => {
    for (const e of entities) {
      if (e.isPlayer) {
        e.velocity.x = 0;

        if (isInputDown(InputCode.KEY_LEFT)) {
          e.velocity.x -= 1;
        }
        if (isInputDown(InputCode.KEY_RIGHT)) {
          e.velocity.x += 1;
        }
        if (isInputPressed(InputCode.KEY_SPACE) && e.bodyIsOnGround) {
          e.velocity.y = -2;
        }
      }

      if (!e.bodyIsStatic) {
        addVectorScaled(e.gravity, GRAVITY, delta);
        addVectorScaled(e.velocity, e.gravity, delta);
      }
      addVectorScaled(e.position, e.velocity, delta);

      e.body.x = e.position.x;
      e.body.y = e.position.y;
      resetVector(e.bodyIntersectionResult);

      for (const other of entities) {
        getIntersectionBetweenRectangles(
          e.body,
          other.body,
          e.velocity,
          e.bodyIntersectionResult,
        );
      }

      if (e.bodyIntersectionResult.x) {
        e.body.x += e.bodyIntersectionResult.x;
        e.position.x += e.bodyIntersectionResult.x;
        e.velocity.x = 0;
        e.gravity.x = 0;
      }
      if (e.bodyIntersectionResult.y) {
        e.body.y += e.bodyIntersectionResult.y;
        e.position.y += e.bodyIntersectionResult.y;
        e.velocity.y = 0;
        e.gravity.y = 0;
      }

      e.bodyIsOnGround = e.bodyIntersectionResult.y < 0;

      if (e.isPlayer) {
        updateCamera(e.position.x, e.position.y, boundary);
      }

      resetTransform();
      applyCameraTransform();
      drawRect(e.body, e.color, true);
    }

    resetTransform();
    scaleTransform(0.125, 0.125);
    drawText(`FPS: ${fps}`, 2, 2, "lime");
  },
});
