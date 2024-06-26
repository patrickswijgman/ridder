import { getCamera } from "./camera.js";
import { ctx, scale } from "./canvas.js";
import { Circle } from "./circle.js";
import { getFont } from "./fonts.js";
import { Polygon } from "./polygon.js";
import { Rect } from "./rect.js";
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
  alpha = 1,
  scrollX = 1,
  scrollY = 1,
) {
  reset(scrollX, scrollY, alpha);
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
  alpha = 1,
  scrollX = 1,
  scrollY = 1,
) {
  const spr = getSprite(id);
  const tex = getTexture(spr.textureId);

  reset(scrollX, scrollY, alpha);
  ctx.translate(x, y);
  ctx.scale(scaleX, scaleY);
  ctx.rotate(toRadians(angle));
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
  alpha = 1,
  align: CanvasTextAlign = "left",
  baseline: CanvasTextBaseline = "top",
  fontId = "default",
  scrollX = 1,
  scrollY = 1,
  maxWidth = Number.MAX_SAFE_INTEGER,
) {
  reset(scrollX, scrollY, alpha);
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
  alpha = 1,
  scrollX = 1,
  scrollY = 1,
) {
  reset(scrollX, scrollY, alpha);

  if (fill) {
    ctx.fillStyle = color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }
}

/**
 * Draw a Circle instance.
 */
export function drawCircle(
  circle: Circle,
  color: string,
  fill: boolean,
  alpha = 1,
  scrollX = 1,
  scrollY = 1,
) {
  reset(scrollX, scrollY, alpha);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

/**
 * Draw a Polygon instance.
 */
export function drawPolygon(
  polygon: Polygon,
  color: string,
  fill: boolean,
  alpha = 1,
  scrollX = 1,
  scrollY = 1,
) {
  if (!polygon.isValid()) {
    return;
  }

  reset(scrollX, scrollY, alpha);
  ctx.translate(polygon.x, polygon.y);
  ctx.beginPath();
  ctx.moveTo(polygon.points[0].x, polygon.points[0].y);

  for (let i = 1; i < polygon.points.length; i++) {
    ctx.lineTo(polygon.points[i].x, polygon.points[i].y);
  }

  ctx.closePath();

  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

/**
 * Reset the drawing pencil.
 */
function reset(scrollX: number, scrollY: number, alpha: number) {
  const camera = getCamera();

  ctx.setTransform(scale.x, 0, 0, scale.y, 0, 0);
  ctx.translate(-camera.x * scrollX, -camera.y * scrollY);
  ctx.globalAlpha = alpha;
}
