import { createCanvas, toHex } from "./utils.js";
import { vec } from "./vector.js";

type Pixel = {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
  hex: string;
};

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

/**
 * Read the image data of a canvas and returns a list of {@link Pixel} data.
 */
export function getPixels(canvas: HTMLCanvasElement) {
  const pixels: Array<Pixel> = [];
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const x = (i / 4) % canvas.width;
    const y = Math.floor(i / 4 / canvas.height);
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    const a = imageData.data[i + 3] / 255;
    const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    pixels.push({ x, y, r, g, b, a, hex });
  }

  return pixels;
}
