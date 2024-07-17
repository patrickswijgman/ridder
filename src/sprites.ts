type SpriteData = {
  textureId: string;
  x: number;
  y: number;
  w: number;
  h: number;
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
) {
  sprites[id] = { textureId, x, y, w, h };
}

/**
 * Get a loaded sprite.
 */
export function getSprite(id: string): Readonly<SpriteData> {
  return sprites[id];
}
