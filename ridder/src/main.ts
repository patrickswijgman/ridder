import { setupCanvas } from "./canvas.js";
import { resetInputs, setupInput, updateMousePosition } from "./input.js";
import { clearBackground, resetTransform } from "./render.js";
import { Settings, getSettings, setSettings } from "./settings.js";
import { setupState, updateState } from "./state.js";

type RunConfig = {
  settings: Partial<Settings>;
  setup: () => Promise<void>;
  update: () => void;
};

export async function run(config: RunConfig) {
  setSettings(config.settings);
  setupCanvas();
  setupInput();
  await config.setup();
  setupState();

  const settings = getSettings();

  const tick = () => {
    if (updateState()) {
      clearBackground(settings.background);
      resetTransform();
      updateMousePosition();
      config.update();
      resetInputs();
    }

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}
