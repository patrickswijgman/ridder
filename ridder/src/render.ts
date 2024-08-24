import { getCamera } from "./camera.js";
import { canvas, ctx, scale } from "./canvas.js";
import { Circle } from "./circle.js";
import { getFont } from "./fonts.js";
import { Polygon } from "./polygon.js";
import { Rectangle } from "./rectangle.js";
import { getSettings } from "./settings.js";
import { getSprite } from "./sprites.js";
import { getTexture } from "./textures.js";
import { toRadians } from "./utils.js";
import { Vector } from "./vector.js";

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
  ctx.drawImage(texture, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
}

export function drawText(text: string, x: number, y: number, color = "white", align: TextAlign = "left", baseline: TextBaseline = "top", fontId = "default") {
  const font = getFont(fontId);
  ctx.font = font ? font : "16px sans-serif";
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export function drawRect(x: number, y: number, w: number, h: number, color = "white", fill = false) {
  if (fill) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
}

export function drawRectInstance(r: Rectangle, color = "white", fill = false) {
  drawRect(r.x, r.y, r.w, r.h, color, fill);
}

export function drawCircle(x: number, y: number, r: number, color = "white", fill = false) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();

  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

export function drawCircleInstance(c: Circle, color = "white", fill = false) {
  drawCircle(c.x, c.y, c.r, color, fill);
}

export function drawPolygon(x: number, y: number, points: Array<Vector>, color = "white", fill = false) {
  if (points.length < 3) return;

  ctx.beginPath();
  ctx.moveTo(x + points[0].x, y + points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(x + points[i].x, y + points[i].y);
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

export function drawPolygonInstance(p: Polygon, color = "white", fill = false) {
  drawPolygon(p.x, p.y, p.points, color, fill);
}
