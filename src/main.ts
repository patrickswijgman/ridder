import { canvas, ctx, setupCanvas } from "./canvas.js";
import {
  getMousePosition,
  resetInputs,
  setupInput,
  updateMousePosition,
} from "./input.js";
import { Settings, getSettings, setSettings } from "./settings.js";
import { timer } from "./timer.js";

type RunConfig = {
  /**
   * The global game settings.
   * @example
   * settings: {
   *   width: 320,
   *   height: 180,
   * }
   */
  settings: Partial<Settings>;
  /**
   * Setup before the game starts. Load your textures, fonts and sounds here.
   * @example
   * setup: async () => {
   *   await loadTexture("player", "/assets/textures/player.png");
   * }
   */
  setup: () => Promise<void>;
  /**
   * Game logic update in the current frame.
   * @param delta - The scalar value since the last frame.
   * @param time - The time in milliseconds since the last frame.
   * @example
   * update: (delta, time) => {
   *   // The game runs at 60 frames-per-second but the last frame took twice as long:
   *   // delta === 2.0
   *   // time === 33.34 (1/60 === 16.67)
   *
   *   // Use `delta` when moving things:
   *   player.position.add(velocity, delta);
   *
   *   // Use `time` when updating timers and tweens:
   *   timer.tick(1000, time);
   * }
   */
  update: (delta: number, time: number) => void;
  /**
   * Render the textures, sprites and texts in the current frame.
   * @example
   * render: () => {
   *   drawSprite("player", player.position.x, player.position.y);
   * }
   */
  render: () => void;
};

let last = 0;
let now = 0;

let frames = 0;
let framesTimer = timer();
let fps = 0;

/**
 * Run your game.
 */
export async function run(config: RunConfig) {
  setSettings(config.settings);
  setupCanvas();
  setupInput();

  await config.setup();

  const settings = getSettings();

  const tick = (elapsed: number) => {
    last = now;
    // Cap the delta time at 100 milliseconds (10 fps). It could be that the tab
    // was frozen or minimized, which would cause a ridiculous amount of delta time.
    now = Math.min(elapsed, last + 100);

    const delta = now / last;
    const time = now - last;

    frames++;

    if (framesTimer.tick(1000, time)) {
      fps = frames;
      frames = 0;
      framesTimer.reset();
    }

    updateMousePosition();

    config.update(delta, time);

    ctx.resetTransform();
    ctx.fillStyle = settings.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    config.render();

    if (settings.debug) {
      drawDebugInfo();
    }

    resetInputs();
    requestAnimationFrame(tick);
  };

  last = performance.now();
  now = performance.now();

  requestAnimationFrame(tick);
}

/**
 * Draw debug info like frames-per-second.
 */
function drawDebugInfo() {
  const msp = getMousePosition(false);
  const mwp = getMousePosition(true);

  ctx.resetTransform();
  ctx.font = "16px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "lime";

  ctx.translate(5, 5);
  ctx.fillText(`FPS: ${fps}`, 0, 0);

  ctx.translate(0, 18);
  ctx.fillText(`Mouse (screen): ${msp.x.toFixed()}, ${msp.y.toFixed()}`, 0, 0);

  ctx.translate(0, 18);
  ctx.fillText(`Mouse (world): ${mwp.x.toFixed()}, ${mwp.y.toFixed()}`, 0, 0);
}
