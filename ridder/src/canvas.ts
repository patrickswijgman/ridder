import { createCanvas } from "./utils.js";
import { vec } from "./vector.js";

let width = 800;
let height = 600;

export const [canvas, ctx] = createCanvas(width, height);
export const scale = vec(1, 1);

/**
 * Setup the main rendering canvas that automatically resizes to the window while maintaining aspect ratio.
 */
export function setupCanvas(w: number, h: number) {
  width = w;
  height = h;
  resize();
  window.addEventListener("resize", resize);
  document.body.appendChild(canvas);
}

/**
 * Resize the canvas to the window while maintaining aspect ratio.
 */
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

  // These particular context options get reset after the canvas is resized.
  ctx.imageSmoothingEnabled = false;
  ctx.textRendering = "optimizeSpeed";
}

/**
 * Return the logical width of the canvas.
 *
 * NOTE - This is the width you used in the `run` function, not the actual width of the canvas element.
 */
export function getWidth() {
  return width;
}

/**
 * Return the logical height of the canvas.
 *
 * NOTE - This is the height you used in the `run` function, not the actual height of the canvas element.
 */
export function getHeight() {
  return height;
}
