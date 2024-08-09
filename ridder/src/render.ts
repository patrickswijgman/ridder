import { getCamera } from "./camera.js";
import { canvas, ctx, scale } from "./canvas.js";
import { Circle } from "./circle.js";
import { getFont } from "./fonts.js";
import { Polygon, isPolygonValid } from "./polygon.js";
import { Rectangle } from "./rectangle.js";
import { getSettings } from "./settings.js";
import { getSprite } from "./sprites.js";
import { getTexture } from "./textures.js";
import { toRadians } from "./utils.js";

export type TextAlign = "left" | "center" | "right";
export type TextBaseline = "top" | "middle" | "bottom";

export function clearBackground() {
  const settings = getSettings();
  ctx.resetTransform();
  ctx.fillStyle = settings.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function resetTransform() {
  ctx.setTransform(scale.x, 0, 0, scale.y, 0, 0);
}

export function translateTransform(x: number, y: number) {
  ctx.translate(x, y);
}

export function scaleTransform(x: number, y: number) {
  ctx.scale(x, y);
}

export function rotateTransform(degrees: number) {
  ctx.rotate(toRadians(degrees));
}

export function applyCameraTransform(scrollX = 1, scrollY = 1) {
  const camera = getCamera();
  ctx.translate(-camera.x * scrollX, -camera.y * scrollY);
}

export function drawTexture(id: string, x: number, y: number) {
  ctx.drawImage(getTexture(id), x, y);
}

export function drawSprite(id: string, x: number, y: number) {
  const sprite = getSprite(id);
  const texture = getTexture(sprite.textureId);
  ctx.drawImage(
    texture,
    sprite.x,
    sprite.y,
    sprite.w,
    sprite.h,
    x,
    y,
    sprite.w,
    sprite.h,
  );
}

export function drawText(
  text: string,
  x: number,
  y: number,
  color = "white",
  align: TextAlign = "left",
  baseline: TextBaseline = "top",
  fontId = "default",
) {
  const font = getFont(fontId);
  ctx.font = font ? font : "16px sans-serif";
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export function drawRect(r: Rectangle, color = "white", fill = false) {
  if (fill) {
    ctx.fillStyle = color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(r.x, r.y, r.w, r.h);
  }
}

export function drawCircle(c: Circle, color = "white", fill = false) {
  ctx.beginPath();
  ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

export function drawPolygon(p: Polygon, color = "white", fill = false) {
  if (!isPolygonValid(p)) return;

  ctx.beginPath();
  ctx.moveTo(p.x + p.points[0].x, p.y + p.points[0].y);
  for (let i = 1; i < p.points.length; i++) {
    ctx.lineTo(p.x + p.points[i].x, p.y + p.points[i].y);
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
