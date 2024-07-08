type TextureData = {
  source: HTMLImageElement | HTMLCanvasElement;
  pivotX: number;
  pivotY: number;
};

const textures: Record<string, TextureData> = {};

/**
 * Load a texture from an image.
 */
export async function loadTexture(
  id: string,
  src: string,
  pivotX = 0,
  pivotY = 0,
) {
  const img = new Image();

  img.src = src;

  await img.decode();

  textures[id] = {
    source: img,
    pivotX,
    pivotY,
  };
}

/**
 * Load a texture which you can draw on yourself.
 */
export function loadRenderTexture(
  id: string,
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
  pivotX = 0,
  pivotY = 0,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;

  draw(ctx);

  textures[id] = {
    source: canvas,
    pivotX,
    pivotY,
  };
}

/**
 * Get a loaded texture.
 */
export function getTexture(id: string): Readonly<TextureData> {
  return textures[id];
}
