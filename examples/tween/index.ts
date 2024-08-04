import {
  drawSprite,
  getSettings,
  isInputPressed,
  loadSprite,
  loadTexture,
  resetTimer,
  resetTransform,
  rotateTransform,
  run,
  scaleTransform,
  tickTimer,
  timer,
  Timer,
  translateTransform,
  tween,
  vec,
  Vector,
} from "ridder";

type Entity = {
  position: Vector;
  angle: number;
  scale: number;
  timer: Timer;
};

function createEntity(): Entity {
  return {
    position: vec(),
    angle: 0,
    scale: 1,
    timer: timer(),
  };
}

const entityA = createEntity();
const entityB = createEntity();

const entities = [entityA, entityB];

run({
  settings: {
    width: 160,
    height: 90,
  },

  setup: async () => {
    await loadTexture("tilemap", "textures/tilemap.png");

    loadSprite("snowman", "tilemap", 95, 133, 18, 18);

    const settings = getSettings();

    entityA.position.x = settings.width / 3;
    entityA.position.y = settings.height / 2;

    entityB.position.x = (settings.width / 3) * 2;
    entityB.position.y = settings.height / 2;
  },

  update: () => {
    // Ease a full rotation (0~360 degrees) in 5 seconds.
    // There are many different easing functions, see them here: https://easings.net/
    tickTimer(entityA.timer, 5000);
    entityA.angle = tween(
      0,
      360,
      5000,
      entityA.timer.elapsed,
      "easeOutElastic",
    );

    // You can loop tweens by passing a timer that runs infinitely.
    tickTimer(entityB.timer, Infinity);
    entityB.scale = tween(1, 2, 2000, entityB.timer.elapsed, "easeInOutSine");

    // You can reset tweens and have them play again.
    if (isInputPressed("Enter")) {
      for (const e of entities) {
        e.angle = 0;
        e.scale = 1;
        resetTimer(e.timer);
      }
    }

    for (const e of entities) {
      resetTransform(); // Important to reset the transform matrix, otherwise this drawing will be drawn relative to the previous one.
      translateTransform(e.position.x, e.position.y);
      rotateTransform(e.angle);
      scaleTransform(e.scale, e.scale);
      drawSprite("snowman", -9, -18); // When translating the transform matrix you can pass the x and y here as the center of rotation.
    }
  },
});
