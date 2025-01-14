import { addVectorScaled, doesRectangleContain, drawRectInstance, drawTexture, getDelta, getMousePosition, InputCode, isInputDown, loadTexture, normalizeVector, rect, resetTransform, resetVector, run, scaleTransform, setAlpha, translateTransform, vec, Vector } from "ridder";

const enum TextureId {
  PLAYER,
  DIRECTIONS,
}

const u = rect(16, 104, 24, 16);
const d = rect(16, 128, 24, 16);
const l = rect(8, 112, 16, 24);
const r = rect(32, 112, 16, 24);

type Entity = {
  position: Vector;
  velocity: Vector;
  isFlipped: boolean;
};

const player: Entity = {
  position: vec(),
  velocity: vec(),
  isFlipped: false,
};

run({
  width: 90,
  height: 160,

  setup: async () => {
    await loadTexture(TextureId.PLAYER, "textures/player.png");
    await loadTexture(TextureId.DIRECTIONS, "textures/directions.png");

    player.position.x = 45;
    player.position.y = 80;
  },

  update: () => {
    const mouse = getMousePosition();

    resetVector(player.velocity);

    if (isInputDown(InputCode.MOUSE_LEFT)) {
      if (doesRectangleContain(u, mouse.x, mouse.y)) {
        player.velocity.y -= 1;
      }
      if (doesRectangleContain(d, mouse.x, mouse.y)) {
        player.velocity.y += 1;
      }
      if (doesRectangleContain(l, mouse.x, mouse.y)) {
        player.velocity.x -= 1;
        player.isFlipped = true;
      }
      if (doesRectangleContain(r, mouse.x, mouse.y)) {
        player.velocity.x += 1;
        player.isFlipped = false;
      }
    }

    normalizeVector(player.velocity);
    addVectorScaled(player.position, player.velocity, getDelta());
  },

  render: () => {
    translateTransform(player.position.x, player.position.y);
    if (player.isFlipped) {
      scaleTransform(-1, 1);
    }
    drawTexture(TextureId.PLAYER, -8, -8);

    resetTransform();
    setAlpha(0.5);
    translateTransform(4, 100);
    scaleTransform(3, 3);
    drawTexture(TextureId.DIRECTIONS, 0, 0);
    setAlpha(1);

    resetTransform();
    drawRectInstance(u, "white", false);
    drawRectInstance(d, "red", false);
    drawRectInstance(l, "green", false);
    drawRectInstance(r, "blue", false);
  },
});
