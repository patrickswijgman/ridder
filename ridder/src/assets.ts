import { loadFont } from "./fonts.js";
import { loadSound } from "./sounds.js";
import { loadSprite } from "./sprites.js";
import { loadFlashTexture, loadOutlineTexture, loadTexture } from "./textures.js";

type TextureAsset = {
  url: string;
  sprites?: Record<string, [x: number, y: number, w: number, h: number]>;
};

type OutlineTextureAsset = {
  url: string;
  mode: "circle" | "square";
  color: string;
  sprites?: Record<string, [x: number, y: number, w: number, h: number]>;
};

type FlashTextureAsset = {
  url: string;
  color: string;
  sprites?: Record<string, [x: number, y: number, w: number, h: number]>;
};

type FontAsset = {
  family: string;
  url: string;
  size: number;
};

type SoundAsset = {
  url: string;
  volume?: number;
  stream?: boolean;
};

export type AssetsManifest = {
  textures: Record<string, TextureAsset>;
  outlineTextures?: Record<string, OutlineTextureAsset>;
  flashTextures?: Record<string, FlashTextureAsset>;
  fonts: Record<string, FontAsset>;
  sounds: Record<string, SoundAsset>;
};

export async function loadAssets(manifest: AssetsManifest) {
  const promises: Array<Promise<unknown>> = [];

  for (const id in manifest.textures) {
    const { url, sprites } = manifest.textures[id];
    const promise = loadTexture(id, url);
    for (const spriteId in sprites) {
      const sprite = sprites[spriteId];
      loadSprite(spriteId, id, ...sprite);
    }
    promises.push(promise);
  }

  for (const id in manifest.outlineTextures) {
    const { url, sprites, mode, color } = manifest.outlineTextures[id];
    const promise = loadOutlineTexture(id, url, mode, color);
    for (const spriteId in sprites) {
      const sprite = sprites[spriteId];
      loadSprite(spriteId, id, ...sprite);
    }
    promises.push(promise);
  }

  for (const id in manifest.flashTextures) {
    const { url, sprites, color } = manifest.flashTextures[id];
    const promise = loadFlashTexture(id, url, color);
    for (const spriteId in sprites) {
      const sprite = sprites[spriteId];
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
