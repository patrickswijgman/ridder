const textures: Record<string, CanvasImageSource> = {};

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
 * Get a loaded texture.
 */
export function getTexture(id: string) {
  return textures[id];
}
