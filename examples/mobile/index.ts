import { addVectorScaled, doesRectangleContain, drawRectInstance, drawTexture, getEngineState, getMousePosition, InputCode, isInputDown, loadTexture, normalizeVector, rect, resetTransform, resetVector, run, scaleTransform, setAlpha, translateTransform, vec, Vector } from "ridder";

const u = rect(16, 104, 24, 16);
const d = rect(16, 128, 24, 16);
const l = rect(8, 112, 16, 24);
const r = rect(32, 112, 16, 24);

type Player = {
  position: Vector;
  velocity: Vector;
};

const player: Player = {
  position: vec(),
  velocity: vec(),
};

run({
  settings: {
    width: 90,
    height: 160,
  },

  setup: async () => {
    await loadTexture("player", "textures/player.png");
    await loadTexture("directions", "textures/directions.png");

    player.position.x = 45;
    player.position.y = 80;
  },

  update: () => {
    const { delta } = getEngineState();
    const mouse = getMousePosition(false);

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
      }
      if (doesRectangleContain(r, mouse.x, mouse.y)) {
        player.velocity.x += 1;
      }
    }

    normalizeVector(player.velocity);
    addVectorScaled(player.position, player.velocity, delta);

    resetTransform();
    translateTransform(player.position.x, player.position.y);
    drawTexture("player", -8, -8);

    resetTransform();
    setAlpha(0.5);
    translateTransform(4, 100);
    scaleTransform(3, 3);
    drawTexture("directions", 0, 0);
    setAlpha(1);

    resetTransform();
    drawRectInstance(u, "white", false);
    drawRectInstance(d, "red", false);
    drawRectInstance(l, "green", false);
    drawRectInstance(r, "blue", false);
  },
});
