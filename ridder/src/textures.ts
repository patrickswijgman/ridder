import { createCanvas } from "./utils.js";

const images: Record<string, HTMLImageElement> = {};
const textures: Record<string, HTMLCanvasElement> = {};

async function loadImage(url: string) {
  if (url in images) {
    return images[url];
  }

  const img = new Image();
  img.src = url;
  await img.decode();

  images[url] = img;

  return img;
}

export async function loadTexture(id: string, url: string) {
  const img = await loadImage(url);
  const [canvas, ctx] = createCanvas(img.width, img.height);
  ctx.drawImage(img, 0, 0);
  textures[id] = canvas;
}

export function loadRenderTexture(id: string, width: number, height: number, draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void) {
  const [canvas, ctx] = createCanvas(width, height);
  draw(ctx, width, height);
  textures[id] = canvas;
}

export async function loadOutlineTexture(id: string, url: string, mode: "circle" | "square", color: string) {
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

export async function loadOutlinedTexture(id: string, url: string, mode: "circle" | "square", color: string) {
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

export async function loadFlashTexture(id: string, url: string, color: string) {
  const img = await loadImage(url);
  loadRenderTexture(id, img.width, img.height, (ctx, w, h) => {
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
  });
}

export function getTexture(id: string) {
  return textures[id];
}
