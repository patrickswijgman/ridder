import { canvas, ctx, setupCanvas } from "./canvas.js";
import {
  getMousePosition,
  mostRecentInput,
  resetInputs,
  setupInput,
  updateMousePosition,
} from "./input.js";
import { Settings, getSettings, setSettings } from "./settings.js";
import { fps, setupState, updateState } from "./state.js";

type RunConfig = {
  /** The global game settings. */
  settings: Partial<Settings>;
  /** Setup before the game starts. Load your textures, sprites, fonts and sounds here. */
  setup: () => Promise<void>;
  /** Game logic and render update for the current frame. */
  update: () => void;
};

let frameId: number;

/**
 * Run your game.
 */
export async function run(config: RunConfig) {
  setSettings(config.settings);
  setupCanvas();
  setupInput();
  await config.setup();
  setupState();

  const settings = getSettings();

  const tick = () => {
    updateState(frameId);
    clearBackground(settings.background);
    updateMousePosition();
    config.update();
    drawDebugInfo(settings.debug);
    resetInputs();

    frameId = requestAnimationFrame(tick);
  };

  frameId = requestAnimationFrame(tick);
}

/**
 * Clear the canvas before rendering the next frame. This prevents draw
 * artifacts from the previous frame.
 */
function clearBackground(color: string) {
  ctx.resetTransform();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draw debug info like frames-per-second.
 */
function drawDebugInfo(enabled: boolean) {
  if (!enabled) return;

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
  ctx.translate(0, 18);
  ctx.fillText(`Most recent input: ${mostRecentInput}`, 0, 0);
}
