import { getCamera } from "./camera.js";
import { ctx, scale } from "./canvas.js";
import { Circle } from "./circle.js";
import { Polygon } from "./polygon.js";
import { Rect } from "./rect.js";
import { toRadians } from "./utils.js";

export abstract class RenderObject {
  x = 0;
  y = 0;
  offsetX = 0;
  offsetY = 0;
  scaleX = 1;
  scaleY = 1;
  angle = 0;
  alpha = 1;
  scrollX = 1;
  scrollY = 1;

  draw() {
    const cam = getCamera();
    const camX = -cam.x * this.scrollX;
    const camY = -cam.y * this.scrollY;

    const x = this.x + this.offsetX;
    const y = this.y + this.offsetY;

    ctx.setTransform(scale.x, 0, 0, scale.y, 0, 0);
    ctx.translate(camX, camY);
    ctx.translate(x, y);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.rotate(toRadians(this.angle));
    ctx.globalAlpha = this.alpha;
  }
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
