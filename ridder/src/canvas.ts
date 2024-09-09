import { vec } from "./vector.js";

export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d")!;
export const scale = vec(1, 1);

let width = 800;
let height = 600;

export function setupCanvas(w: number, h: number) {
  width = w;
  height = h;
  resize();
  window.addEventListener("resize", resize);
  document.body.appendChild(canvas);
}

function resize() {
  const r = width / height;

  let w = window.innerWidth;
  let h = w / r;

  if (h > window.innerHeight) {
    h = window.innerHeight;
    w = h * r;
  }

  scale.x = w / width;
  scale.y = h / height;

  canvas.width = w;
  canvas.height = h;

  ctx.imageSmoothingEnabled = false;
  ctx.textRendering = "optimizeSpeed";
}

export function getWidth() {
  return width;
}

export function getHeight() {
  return height;
}
