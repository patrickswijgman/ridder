import { Camera } from "./camera.js";
import { canvas, ctx, scale } from "./canvas.js";
import { Circle } from "./circle.js";
import { getFont } from "./fonts.js";
import { Polygon } from "./polygon.js";
import { Rectangle } from "./rectangle.js";
import { getSprite } from "./sprites.js";
import { getTexture } from "./textures.js";
import { toRadians } from "./utils.js";
import { Vector } from "./vector.js";

const DEFAULT_LINE_SEGMENTS: Array<number> = [];

export type TextAlign = "left" | "center" | "right";
export type TextBaseline = "top" | "middle" | "bottom";

let background = "black";
let font = "16px sans-serif";

/**
 * Clear the background using the set `background` color.
 *
 * @see {@link setBackgroundColor}
 */
export function clearBackground() {
  ctx.resetTransform();
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Reset the transformation matrix, also known as the identity matrix.
 */
export function resetTransform() {
  ctx.setTransform(scale.x, 0, 0, scale.y, 0, 0);
}

/**
 * Move the origin of the transformation matrix by the given x and y values.
 */
export function translateTransform(x: number, y: number) {
  ctx.translate(x, y);
}

/**
 * Additionally scale the transformation matrix by the given x and y values.
 */
export function scaleTransform(x: number, y: number) {
  ctx.scale(x, y);
}

/**
 * Rotate the transformation matrix by the given degrees.
 */
export function rotateTransform(degrees: number) {
  ctx.rotate(toRadians(degrees));
}

/**
 * Add the camera transform (position, shake) to the current transformation matrix.
 * @param scrollX - The scrolling factor for the x-axis, you can add a parallax effect by setting this to a value between 0 and 1.
 * @param scrollY - The scrolling factor for the y-axis, you can add a parallax effect by setting this to a value between 0 and 1.
 */
export function applyCameraTransform(c: Camera, scrollX = 1, scrollY = 1) {
  const x = c.position.x + c.shake.x;
  const y = c.position.y + c.shake.y;
  ctx.translate(-x * scrollX, -y * scrollY);
}

/**
 * Draw a texture from the cache onto the canvas.
 */
export function drawTexture(id: string, x: number, y: number) {
  ctx.drawImage(getTexture(id), x, y);
}

/**
 * Draw a sprite (a region within a texture) from the cache onto the canvas.
 */
export function drawSprite(id: string, x: number, y: number) {
  const sprite = getSprite(id);
  const texture = getTexture(sprite.textureId);
  ctx.drawImage(texture, sprite.x, sprite.y, sprite.w, sprite.h, x, y, sprite.w, sprite.h);
}

/**
 * Draw text onto the canvas.
 * @param color - A color value, e.g. `white` or `#ffffff`
 * @param align - The horizontal alignment of the text
 * @param baseline - The vertical alignment of the text
 */
export function drawText(text: string, x: number, y: number, color = "white", align: TextAlign = "left", baseline: TextBaseline = "top") {
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

/**
 * Draw a rectangle onto the canvas.
 */
export function drawRect(x: number, y: number, w: number, h: number, color = "white", fill = false) {
  if (fill) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
}

/**
 * Draw a rectangle onto the canvas.
 */
export function drawRectInstance(r: Rectangle, color = "white", fill = false) {
  drawRect(r.x, r.y, r.w, r.h, color, fill);
}

/**
 * Draw a circle onto the canvas.
 */
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

/**
 * Draw a circle onto the canvas.
 */
export function drawCircleInstance(c: Circle, color = "white", fill = false) {
  drawCircle(c.x, c.y, c.r, color, fill);
}

/**
 * Draw a polygon onto the canvas.
 */
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

/**
 * Draw a polygon onto the canvas.
 */
export function drawPolygonInstance(p: Polygon, color = "white", fill = false) {
  drawPolygon(p.x, p.y, p.points, color, fill);
}

/**
 * Draw a line onto the canvas.
 */
export function drawLine(x1: number, y1: number, x2: number, y2: number, color = "white", segments = DEFAULT_LINE_SEGMENTS) {
  ctx.beginPath();
  ctx.setLineDash(segments);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Set the background color of the canvas.
 */
export function setBackgroundColor(color: string) {
  background = color;
}

/**
 * Use a font from the cache for the upcoming text rendering.
 */
export function setFont(id: string) {
  font = getFont(id);
}

/**
 * Set the alpha for the upcoming drawings.
 */
export function setAlpha(alpha: number) {
  ctx.globalAlpha = alpha;
}

/**
 * Set the blendmode for the upcoming drawings.
 * For an overview of blend modes, see the bottom of [this](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation) MDN page.
 */
export function setBlendMode(mode: GlobalCompositeOperation) {
  ctx.globalCompositeOperation = mode;
}
