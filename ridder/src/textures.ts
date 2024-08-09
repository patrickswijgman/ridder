export type Texture = HTMLImageElement | HTMLCanvasElement;

const textures: Record<string, Texture> = {};

export async function loadTexture(id: string, src: string) {
  const img = new Image();
  img.src = src;
  await img.decode();
  textures[id] = img;
}

export function loadRenderTexture(
  id: string,
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, width, height);
  textures[id] = canvas;
}

export function getTexture(id: string): Readonly<Texture> {
  return textures[id];
}
