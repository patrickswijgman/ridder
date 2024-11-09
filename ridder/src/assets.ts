import { loadFont } from "./fonts.js";
import { loadSound } from "./sounds.js";
import { loadSprite } from "./sprites.js";
import { loadFlashTexture, loadOutlineTexture, loadOutlinedTexture, loadRenderTexture, loadTexture } from "./textures.js";

type SpriteAsset = [x: number, y: number, w: number, h: number];

type TextureAsset = {
  url: string;
  sprites?: Record<string, SpriteAsset>;
};

type OutlineTextureAsset = {
  url: string;
  mode: "circle" | "square";
  color: string;
  sprites?: Record<string, SpriteAsset>;
};

type OutlinedTextureAsset = {
  url: string;
  mode: "circle" | "square";
  color: string;
  sprites?: Record<string, SpriteAsset>;
};

type FlashTextureAsset = {
  url: string;
  color: string;
  sprites?: Record<string, SpriteAsset>;
};

type RenderTextureAsset = {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
  sprites?: Record<string, SpriteAsset>;
};

type FontAsset = {
  url: string;
  family: string;
  size: number;
};

type SoundAsset = {
  url: string;
  stream?: boolean;
};

export type AssetsManifest = {
  textures: Record<string, TextureAsset>;
  outlineTextures: Record<string, OutlineTextureAsset>;
  outlinedTextures: Record<string, OutlinedTextureAsset>;
  flashTextures: Record<string, FlashTextureAsset>;
  renderTextures: Record<string, RenderTextureAsset>;
  fonts: Record<string, FontAsset>;
  sounds: Record<string, SoundAsset>;
};

export async function loadAssets(manifest: Partial<AssetsManifest>) {
  const promises: Array<Promise<unknown>> = [];

  for (const id in manifest.textures) {
    const { url, sprites } = manifest.textures[id];
    const promise = loadTexture(id, url);
    loadSprites(id, sprites);
    promises.push(promise);
  }

  for (const id in manifest.outlineTextures) {
    const { url, sprites, mode, color } = manifest.outlineTextures[id];
    const promise = loadOutlineTexture(id, url, mode, color);
    loadSprites(id, sprites);
    promises.push(promise);
  }

  for (const id in manifest.outlinedTextures) {
    const { url, sprites, mode, color } = manifest.outlinedTextures[id];
    const promise = loadOutlinedTexture(id, url, mode, color);
    loadSprites(id, sprites);
    promises.push(promise);
  }

  for (const id in manifest.flashTextures) {
    const { url, sprites, color } = manifest.flashTextures[id];
    const promise = loadFlashTexture(id, url, color);
    loadSprites(id, sprites);
    promises.push(promise);
  }

  await Promise.all(promises);

  for (const id in manifest.renderTextures) {
    const { width, height, draw, sprites } = manifest.renderTextures[id];
    loadRenderTexture(id, width, height, draw);
    loadSprites(id, sprites);
  }

  for (const id in manifest.fonts) {
    const { url, family, size } = manifest.fonts[id];
    const promise = loadFont(id, url, family, size);
    promises.push(promise);
  }

  for (const id in manifest.sounds) {
    const { url, stream } = manifest.sounds[id];
    const promise = loadSound(id, url, stream);
    promises.push(promise);
  }

  await Promise.all(promises);
}

function loadSprites(id: string, sprites?: Record<string, SpriteAsset>) {
  for (const spriteId in sprites) {
    const sprite = sprites[spriteId];
    loadSprite(spriteId, id, ...sprite);
  }
}
