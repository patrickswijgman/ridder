import { getSettings } from "./settings.js";
import { getEngineState } from "./state.js";

export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d")!;

export function setupCanvas() {
  resize();
  window.addEventListener("resize", resize);
  document.body.appendChild(canvas);
}

function resize() {
  const settings = getSettings();
  const state = getEngineState();

  const r = settings.width / settings.height;

  let w = window.innerWidth;
  let h = w / r;

  if (h > window.innerHeight) {
    h = window.innerHeight;
    w = h * r;
  }

  state.scale.x = w / settings.width;
  state.scale.y = h / settings.height;

  canvas.width = w;
  canvas.height = h;

  ctx.imageSmoothingEnabled = false;
  ctx.textRendering = "optimizeSpeed";
}
