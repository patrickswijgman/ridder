import { getSettings } from "./settings.js";
import { vec } from "./vector.js";

export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d")!;
export const scale = vec(1, 1);

export function setupCanvas() {
  resize();
  window.addEventListener("resize", resize);
  document.body.appendChild(canvas);
}

function resize() {
  const settings = getSettings();

  const r = settings.width / settings.height;

  let w = window.innerWidth;
  let h = w / r;

  if (h > window.innerHeight) {
    h = window.innerHeight;
    w = h * r;
  }

  scale.x = w / settings.width;
  scale.y = h / settings.height;

  canvas.width = w;
  canvas.height = h;

  ctx.imageSmoothingEnabled = false;
  ctx.textRendering = "optimizeSpeed";
}
