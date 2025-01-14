import { createCanvas } from "./utils.js";

const textures: Array<HTMLCanvasElement> = [];

/**
 * Load an image into the cache.
 */
async function loadImage(url: string) {
  const img = new Image();
  img.src = url;
  await img.decode();
  return img;
}

/**
 * Load a texture into the cache.
 * @param id - The ID for the texture in the cache.
 * @param url - The url to the `.png`, `.jpg`, or `.gif` file.
 */
export async function loadTexture(id: number, url: string) {
  const img = await loadImage(url);
  const [canvas, ctx] = createCanvas(img.width, img.height);
  ctx.drawImage(img, 0, 0);
  textures[id] = canvas;
}

/**
 * Load a custom (render) texture into the cache that you can draw on with code.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D} MDN page for the drawing API.
 *
 * @see {@link https://github.com/patrickswijgman/ridder/blob/main/examples/render-texture/index.ts} for an example.
 *
 * @param id - The ID for the texture in the cache.
 * @param width - The width of the texture. Preferably a power of 2, e.g. 16, 32, 64, 128, etc.
 * @param height - The height of the texture. Preferably a power of 2, e.g. 16, 32, 64, 128, etc.
 * @param draw - The drawing function that takes a `CanvasRenderingContext2D` and the width and height of the texture.
 */
export function loadRenderTexture(id: number, width: number, height: number, draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void) {
  const [canvas, ctx] = createCanvas(width, height);
  draw(ctx, width, height);
  textures[id] = canvas;
}

/**
 * Load an outline version of a texture into the cache.
 * This removes the original texture, leaving only the outline.
 *
 * @see {@link loadOutlinedTexture} for a version that draws the outline on top of the texture.
 *
 * @param id - The ID for the texture in the cache.
 * @param url - The url to the `.png`, `.jpg`, or `.gif` file.
 * @param mode - The mode of the outline. Either "circle" or "square".
 * @param color - The color of the outline.
 */
export async function loadOutlineTexture(id: number, url: string, mode: "circle" | "square", color: string) {
  const img = await loadImage(url);
  loadRenderTexture(id, img.width, img.height, (ctx, w, h) => {
    ctx.drawImage(img, 0, -1);
    ctx.drawImage(img, 1, 0);
    ctx.drawImage(img, 0, 1);
    ctx.drawImage(img, -1, 0);
    if (mode === "square") {
      ctx.drawImage(img, 1, -1);
      ctx.drawImage(img, 1, 1);
      ctx.drawImage(img, -1, 1);
      ctx.drawImage(img, -1, -1);
    }
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "destination-out";
    ctx.drawImage(img, 0, 0);
  });
}

/**
 * Load an outlined version of a texture into the cache.
 * This keeps the original texture.
 *
 * @see {@link loadOutlineTexture} for a version that draws the outline and removes the original texture.
 *
 * @param id - The ID for the texture in the cache.
 * @param url - The url to the `.png`, `.jpg`, or `.gif` file.
 * @param mode - The mode of the outline. Either "circle" or "square".
 * @param color - The color of the outline.
 */
export async function loadOutlinedTexture(id: number, url: string, mode: "circle" | "square", color: string) {
  const img = await loadImage(url);
  loadRenderTexture(id, img.width, img.height, (ctx, w, h) => {
    ctx.drawImage(img, 0, -1);
    ctx.drawImage(img, 1, 0);
    ctx.drawImage(img, 0, 1);
    ctx.drawImage(img, -1, 0);
    if (mode === "square") {
      ctx.drawImage(img, 1, -1);
      ctx.drawImage(img, 1, 1);
      ctx.drawImage(img, -1, 1);
      ctx.drawImage(img, -1, -1);
    }
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(img, 0, 0);
  });
}

/**
 * Load a 'flashed' texture into the cache.
 * This is a texture with a color overlay.
 * @param id - The ID for the texture in the cache.
 * @param url - The url to the `.png`, `.jpg`, or `.gif` file.
 * @param color - The color of the overlay.
 */
export async function loadFlashTexture(id: number, url: string, color: string) {
  const img = await loadImage(url);
  loadRenderTexture(id, img.width, img.height, (ctx, w, h) => {
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
  });
}

/**
 * Get a texture from the cache.
 */
export function getTexture(id: number) {
  return textures[id];
}
