export type Texture = HTMLImageElement | HTMLCanvasElement;

const textures: Record<string, Texture> = {};

export async function loadTexture(id: string, src: string) {
  const img = new Image();
  img.src = src;
  await img.decode();
  textures[id] = img;
}

export function loadRenderTexture(id: string, width: number, height: number, draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;
  draw(ctx, width, height);

  textures[id] = canvas;
}

export function loadOutlineTextureFromTexture(id: string, textureId: string, mode: "circle" | "square", color: string) {
  const texture = getTexture(textureId);

  loadRenderTexture(id, texture.width, texture.height, (ctx, w, h) => {
    ctx.drawImage(texture, 0, -1);
    ctx.drawImage(texture, 1, 0);
    ctx.drawImage(texture, 0, 1);
    ctx.drawImage(texture, -1, 0);

    if (mode === "square") {
      ctx.drawImage(texture, 1, -1);
      ctx.drawImage(texture, 1, 1);
      ctx.drawImage(texture, -1, 1);
      ctx.drawImage(texture, -1, -1);
    }

    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "destination-out";
    ctx.drawImage(texture, 0, 0);
  });
}

export function loadFlashTextureFromTexture(id: string, textureId: string, color: string) {
  const texture = getTexture(textureId);

  loadRenderTexture(id, texture.width, texture.height, (ctx, w, h) => {
    ctx.drawImage(texture, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
  });
}

export function getTexture(id: string): Readonly<Texture> {
  return textures[id];
}
