import { loadFont } from "./fonts.js";
import { loadSound } from "./sounds.js";
import { loadSprite } from "./sprites.js";
import { loadTexture } from "./textures.js";

export type AssetsManifest = {
  textures: Record<string, { url: string; sprites?: Record<string, [x: number, y: number, w: number, h: number]> }>;
  fonts: Record<string, { family: string; url: string; size: number }>;
  sounds: Record<string, { url: string; volume?: number; stream?: boolean }>;
};

export async function loadAssets(manifest: AssetsManifest) {
  const promises: Array<Promise<void>> = [];

  for (const id in manifest.textures) {
    const texture = manifest.textures[id];
    const promise = loadTexture(id, texture.url);
    for (const spriteId in texture.sprites) {
      const sprite = texture.sprites[spriteId];
      loadSprite(spriteId, id, ...sprite);
    }
    promises.push(promise);
  }

  for (const id in manifest.fonts) {
    const font = manifest.fonts[id];
    const promise = loadFont(id, font.url, font.family, font.size);
    promises.push(promise);
  }

  for (const id in manifest.sounds) {
    const sound = manifest.sounds[id];
    const promise = loadSound(id, sound.url, sound.volume, sound.stream);
    promises.push(promise);
  }

  await Promise.all(promises);
}
