const textures: Record<string, HTMLImageElement | HTMLCanvasElement> = {};

/**
 * Load a texture from an image.
 */
export async function loadTexture(id: string, src: string) {
  const img = new Image();

  img.src = src;

  await img.decode();

  textures[id] = img;
}

/**
 * Load a texture which you can draw on yourself.
 */
export function loadRenderTexture(
  id: string,
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;

  draw(ctx);

  textures[id] = canvas;
}

/**
 * Get a loaded texture.
 */
export function getTexture(id: string) {
  return textures[id];
}
