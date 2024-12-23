import { updateCameraShake } from "./camera.js";
import { setupCanvas } from "./canvas.js";
import { resetInputs, setupInput, updateMousePosition } from "./input.js";
import { clearBackground, resetTransform } from "./render.js";
import { setupState, updateState } from "./state.js";

type Config = {
  width: number;
  height: number;
  setup: () => Promise<void>;
  update: () => void;
  render: () => void;
};

/**
 * Run the game with your logic updates and rendering.
 */
export async function run(c: Config) {
  setupCanvas(c.width, c.height);
  setupInput();
  await c.setup();
  setupState();

  const tick = () => {
    if (updateState()) {
      updateMousePosition();
      c.update();
      updateCameraShake();
      resetInputs();
      clearBackground();
      resetTransform();
      c.render();
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
