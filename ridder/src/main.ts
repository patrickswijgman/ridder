import { setupCanvas } from "./canvas.js";
import { resetInputs, setupInput } from "./input.js";
import { clearBackground, resetTransform } from "./render.js";
import { setupState, updateState } from "./state.js";

type Config = {
  width: number;
  height: number;
  setup: () => Promise<void>;
  update: () => void;
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
      clearBackground();
      resetTransform();
      c.update();
      resetInputs();
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
