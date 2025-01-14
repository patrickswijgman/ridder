export type Sprite = {
  textureId: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

const sprites: Array<Sprite> = [];

/**
 * Load a sprite into the cache.
 *
 * Use `drawSprite` in the `render` function to draw the sprite onto the canvas.
 *
 * A sprite is a rectangular region within a texture.
 *
 * @param id - The ID for the sprite in the cache.
 * @param textureId - The name of the texture in the cache.
 * @param x - The x-coordinate of the sprite within the texture.
 * @param y - The y-coordinate of the sprite within the texture.
 * @param w - The width of the sprite.
 * @param h - The height of the sprite.
 */
export function loadSprite(id: number, textureId: number, x: number, y: number, w: number, h: number) {
  sprites[id] = { textureId, x, y, w, h };
}

/**
 * Get a sprite from the cache.
 */
export function getSprite(id: number) {
  return sprites[id];
}
