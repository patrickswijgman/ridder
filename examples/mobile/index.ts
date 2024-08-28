import { drawRectInstance, drawTexture, getEngineState, loadTexture, rect, resetTransform, run, scaleTransform, setAlpha, translateTransform } from "ridder";

const u = rect(20, 104, 16, 16);
const d = rect(20, 128, 16, 16);
const l = rect(8, 116, 16, 16);
const r = rect(32, 116, 16, 16);

run({
  settings: {
    width: 90,
    height: 160,
  },

  setup: async () => {
    await loadTexture("directions", "textures/directions.png");
  },

  update: () => {
    const { delta } = getEngineState();

    setAlpha(0.5);
    translateTransform(4, 100);
    scaleTransform(3, 3);
    drawTexture("directions", 0, 0);
    setAlpha(1);

    resetTransform();
    drawRectInstance(u, "red", false);
    drawRectInstance(d, "red", false);
    drawRectInstance(l, "red", false);
    drawRectInstance(r, "red", false);
  },
});
