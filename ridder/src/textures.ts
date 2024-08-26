export type Texture = {
  src: CanvasImageSource;
  width: number;
  height: number;
};

export const textures: Record<string, Texture> = {};

export async function loadTexture(id: string, src: string) {
  const img = new Image();
  img.src = src;
  await img.decode();
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

export function loadOutlineTexture(id: string, textureId: string, mode: "circle" | "square", color: string) {
  const texture = textures[textureId];
  loadRenderTexture(id, texture.width, texture.height, (ctx, w, h) => {
    ctx.drawImage(texture.src, 0, -1);
    ctx.drawImage(texture.src, 1, 0);
    ctx.drawImage(texture.src, 0, 1);
    ctx.drawImage(texture.src, -1, 0);
    if (mode === "square") {
      ctx.drawImage(texture.src, 1, -1);
      ctx.drawImage(texture.src, 1, 1);
      ctx.drawImage(texture.src, -1, 1);
      ctx.drawImage(texture.src, -1, -1);
    }
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "destination-out";
    ctx.drawImage(texture.src, 0, 0);
  });
}

export function loadFlashTexture(id: string, textureId: string, color: string) {
  const texture = textures[textureId];
  loadRenderTexture(id, texture.width, texture.height, (ctx, w, h) => {
    ctx.drawImage(texture.src, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
  });
}
