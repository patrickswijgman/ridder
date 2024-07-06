type SpriteData = {
  textureId: string;
  x: number;
  y: number;
  w: number;
  h: number;
  pivotX: number;
  pivotY: number;
};

const sprites: Record<string, SpriteData> = {};

/**
 * Load a sprite from a loaded texture. A sprite is a subregion of a texture.
 */
export function loadSprite(
  id: string,
  textureId: string,
  x: number,
  y: number,
  w: number,
  h: number,
  pivotX = 0,
  pivotY = 0,
) {
  sprites[id] = { textureId, x, y, w, h, pivotX, pivotY };
}

/**
 * Get a loaded sprite.
 */
export function getSprite(id: string) {
  return sprites[id];
}
