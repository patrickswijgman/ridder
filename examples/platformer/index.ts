import {
  InputCode,
  Rectangle,
  Vector,
  addVectorScaled,
  applyCameraTransform,
  drawRectInstance,
  drawText,
  getDelta,
  getFramePerSecond,
  isInputDown,
  isInputPressed,
  rect,
  resetTransform,
  resetVector,
  run,
  scaleTransform,
  setBackgroundColor,
  setCameraBounds,
  setCameraPosition,
  setCameraSmoothing,
  updateCamera,
  vec,
  writeIntersectionBetweenRectangles,
} from "ridder";

const GRAVITY = vec(0, 0.01);

type Entity = {
  position: Vector;
  velocity: Vector;
  gravity: Vector;

  body: Rectangle;
  bodyIntersectionResult: Vector;

  color: string;

  isPlayer: boolean;
  isAffectedByGravity: boolean;
  isOnGround: boolean;
};

function createEntity(): Entity {
  return {
    position: vec(),
    velocity: vec(),
    gravity: vec(),

    body: rect(),
    bodyIntersectionResult: vec(),

    color: "white",

    isPlayer: false,
    isAffectedByGravity: false,
    isOnGround: false,
  };
}

const entities: Array<Entity> = [];
const boundary = rect(0, 0, 200, 120);

run({
  width: 160,
  height: 90,

  setup: async () => {
    const player = createEntity();
    player.position.x = 20;
    player.position.y = boundary.h - 20 - 8;
    player.body.w = 6;
    player.body.h = 8;
    player.color = "white";
    player.isPlayer = true;
    player.isAffectedByGravity = true;

    const floor = createEntity();
    floor.position.x = 0;
    floor.position.y = boundary.h - 20;
    floor.body.w = boundary.w;
    floor.body.h = 20;
    floor.color = "gray";

    const platform = createEntity();
    platform.position.x = 50;
    platform.position.y = 80;
    platform.body.w = 60;
    platform.body.h = 10;
    platform.color = "gray";

    const wall = createEntity();
    wall.position.x = boundary.w - 20;
    wall.position.y = 0;
    wall.body.w = 20;
    wall.body.h = boundary.h;
    wall.color = "gray";

    entities.push(player, floor, platform, wall);

    setBackgroundColor("#1e1e1e");
    setCameraPosition(player.position.x, player.position.y);
    setCameraBounds(boundary);
    setCameraSmoothing(0.05);
  },

  update: () => {
    const delta = getDelta();

    for (const e of entities) {
      if (e.isPlayer) {
        e.velocity.x = 0;

        if (isInputDown(InputCode.KEY_LEFT)) {
          e.velocity.x -= 1;
        }
        if (isInputDown(InputCode.KEY_RIGHT)) {
          e.velocity.x += 1;
        }
        if (isInputPressed(InputCode.KEY_SPACE) && e.isOnGround) {
          e.velocity.y = -2;
        }
      }

      if (e.isAffectedByGravity) {
        addVectorScaled(e.gravity, GRAVITY, delta);
        addVectorScaled(e.velocity, e.gravity, delta);
      }
      addVectorScaled(e.position, e.velocity, delta);

      e.body.x = e.position.x;
      e.body.y = e.position.y;
      resetVector(e.bodyIntersectionResult);

      for (const other of entities) {
        writeIntersectionBetweenRectangles(e.body, other.body, e.velocity, e.bodyIntersectionResult);
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

      e.isOnGround = e.bodyIntersectionResult.y < 0;

      if (e.isPlayer) {
        updateCamera(e.position.x, e.position.y);
      }
    }
  },

  render: () => {
    for (const e of entities) {
      resetTransform();
      applyCameraTransform();
      drawRectInstance(e.body, e.color, true);
    }

    resetTransform();
    scaleTransform(0.125, 0.125);
    drawText(`FPS: ${getFramePerSecond()}`, 2, 2, "lime");
  },
});
