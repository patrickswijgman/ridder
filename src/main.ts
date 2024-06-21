import { canvas, ctx, setupCanvas } from "./canvas.js";
import {
  getMousePosition,
  resetInputs,
  setupInput,
  updateMousePosition,
} from "./input.js";
import { Settings, getSettings, setSettings } from "./settings.js";
import { fps, setupState, updateState } from "./state.js";

type RunConfig = {
  /** The global game settings. */
  settings: Partial<Settings>;
  /**Setup before the game starts. Load your textures, fonts and sounds here. */
  setup: () => Promise<void>;
  /** Game logic update for the current frame. */
  update: () => void;
  /** Render the textures, sprites and texts in the current frame. */
  render: () => void;
};

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
    const valid = updateState();

    if (valid) {
      updateMousePosition();
      config.update();

      renderBackground(settings.background);
      config.render();
      renderDebugInfo(settings.debug);

      resetInputs();
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

/**
 * Clear the canvas before rendering the next frame. This prevents draw
 * artifacts from the previous frame.
 */
function renderBackground(color: string) {
  ctx.resetTransform();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draw debug info like frames-per-second.
 */
function renderDebugInfo(enabled: boolean) {
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
}
