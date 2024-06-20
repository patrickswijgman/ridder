import { getCamera } from "./camera.js";
import { ctx, scale } from "./canvas.js";
import { getFont } from "./fonts.js";
import { Rect } from "./rect.js";
import { getSettings } from "./settings.js";
import { getSprite } from "./sprites.js";
import { getTexture } from "./textures.js";
import { toRadians } from "./utils.js";

/**
 * Draw a texture.
 */
export function drawTexture(
  id: string,
  x: number,
  y: number,
  scaleX = 1,
  scaleY = 1,
  pivotX = 0,
  pivotY = 0,
  angle = 0,
  scrollX = 1,
  scrollY = 1,
) {
  resetTransform(scrollX, scrollY);
  ctx.translate(x, y);
  ctx.scale(scaleX, scaleY);
  ctx.rotate(toRadians(angle));
  ctx.drawImage(getTexture(id), -pivotX, -pivotY);
}

/**
 * Draw a sprite.
 */
export function drawSprite(
  id: string,
  x: number,
  y: number,
  scaleX = 1,
  scaleY = 1,
  angle = 0,
  scrollX = 1,
  scrollY = 1,
) {
  resetTransform(scrollX, scrollY);
  ctx.translate(x, y);
  ctx.scale(scaleX, scaleY);
  ctx.rotate(toRadians(angle));

  const spr = getSprite(id);
  const tex = getTexture(spr.textureId);

  ctx.drawImage(
    tex,
    spr.region.position.x,
    spr.region.position.y,
    spr.region.width,
    spr.region.height,
    -spr.region.pivot.x,
    -spr.region.pivot.y,
    spr.region.width,
    spr.region.height,
  );
}

/**
 * Draw some text.
 */
export function drawText(
  text: string,
  x: number,
  y: number,
  scale = 1,
  color = "white",
  align: CanvasTextAlign = "left",
  baseline: CanvasTextBaseline = "top",
  fontId = "default",
  scrollX = 1,
  scrollY = 1,
  maxWidth = Number.MAX_SAFE_INTEGER,
) {
  resetTransform(scrollX, scrollY);
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.font = getFont(fontId);
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(text, 0, 0, maxWidth);
}

/**
 * Draw a Rect instance.
 */
export function drawRect(
  rect: Rect,
  color: string,
  fill: boolean,
  scrollX = 1,
  scrollY = 1,
) {
  resetTransform(scrollX, scrollY);

  if (fill) {
    ctx.fillStyle = color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }
}

/**
 * Reset the transform.
 */
function resetTransform(scrollX: number, scrollY: number) {
  const settings = getSettings();
  const camera = getCamera();
  const cameraX = -camera.x + settings.width / 2;
  const cameraY = -camera.y + settings.height / 2;

  ctx.setTransform(scale.x, 0, 0, scale.y, 0, 0);
  ctx.translate(cameraX * scrollX, cameraY * scrollY);
}
