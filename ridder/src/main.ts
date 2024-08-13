import { setupCanvas } from "./canvas.js";
import { resetInputCode, setupInput, updateMousePosition } from "./input.js";
import { clearBackground, resetTransform } from "./render.js";
import { Settings, setSettings } from "./settings.js";
import { setupState, updateState } from "./state.js";

type Config = {
  settings: Partial<Settings>;
  setup: () => Promise<void>;
  update: () => void;
};

export async function run(c: Config) {
  setSettings(c.settings);
  setupCanvas();
  setupInput();
  await c.setup();
  setupState();

  const tick = () => {
    if (updateState()) {
      clearBackground();
      resetTransform();
      updateMousePosition();
      c.update();
      resetInputCode();
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
