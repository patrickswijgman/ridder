import { Rect } from "./rect.js";

type Sprite = {
  textureId: string;
  region: Rect;
};

const sprites: Record<string, Sprite> = {};

/**
 * Load a sprite from a loaded texture. A sprite is a subregion of a texture.
 */
export function loadSprite(id: string, textureId: string, region: Rect) {
  sprites[id] = { textureId, region };
}

/**
 * Get a loaded sprite.
 */
export function getSprite(id: string) {
  return sprites[id];
}
