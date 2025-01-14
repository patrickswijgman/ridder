import { drawSprite, getElapsedTime, getHeight, getWidth, InputCode, isInputPressed, loadSprite, loadTexture, resetTimer, resetTransform, rotateTransform, run, scaleTransform, tickTimer, timer, Timer, translateTransform, tween, vec, Vector } from "ridder";

const enum TextureId {
  TILEMAP,
}

const enum SpriteId {
  SNOWMAN,
}

type Entity = {
  position: Vector;
  angle: number;
  scale: number;
  pivot: Vector;
  timer: Timer;
};

function createEntity(): Entity {
  return {
    position: vec(),
    angle: 0,
    scale: 1,
    pivot: vec(),
    timer: timer(),
  };
}

const one = createEntity();
const two = createEntity();

const entities = [one, two];

run({
  width: 160,
  height: 90,

  setup: async () => {
    await loadTexture(TextureId.TILEMAP, "textures/tilemap.png");
    loadSprite(SpriteId.SNOWMAN, TextureId.TILEMAP, 95, 133, 18, 18);

    const x = getWidth() / 3;
    const y = getHeight() / 2;

    one.position.x = x;
    one.position.y = y;
    one.pivot.x = 9;
    one.pivot.y = 18;

    two.position.x = x * 2;
    two.position.y = y;
    two.pivot.x = 9;
    two.pivot.y = 9;
  },

  update: () => {
    tickTimer(one.timer, 5000);
    one.angle = tween(0, 360, 5000, "easeOutElastic", one.timer.elapsed);

    two.scale = tween(1, 2, 2000, "easeInOutSine", getElapsedTime());

    if (isInputPressed(InputCode.KEY_ENTER)) {
      for (const e of entities) {
        e.angle = 0;
        e.scale = 1;
        resetTimer(e.timer);
      }
    }
  },

  render: () => {
    for (const e of entities) {
      resetTransform();
      translateTransform(e.position.x, e.position.y);
      rotateTransform(e.angle);
      scaleTransform(e.scale, e.scale);
      drawSprite(SpriteId.SNOWMAN, -e.pivot.x, -e.pivot.y);
    }
  },
});
