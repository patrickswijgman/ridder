export type Texture = {
  src: CanvasImageSource;
  width: number;
  height: number;
};

const textures: Record<string, Texture> = {};

async function loadImage(url: string) {
  const img = new Image();
  img.src = url;
  await img.decode();
  return img;
}

export async function loadTexture(id: string, url: string) {
  const img = await loadImage(url);
  textures[id] = { src: img, width: img.width, height: img.height };
}

export function loadRenderTexture(id: string, width: number, height: number, draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, width, height);
  textures[id] = { src: canvas, width, height };
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
