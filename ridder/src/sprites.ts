export type Sprite = {
  textureId: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const sprites: Record<string, Sprite> = {};

export function loadSprite(id: string, textureId: string, x: number, y: number, w: number, h: number) {
  sprites[id] = { textureId, x, y, w, h };
}

export function getSprite(id: string) {
  return sprites[id];
}
