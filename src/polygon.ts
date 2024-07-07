import { ctx } from "./canvas.js";
import { linesIntersect } from "./geom.js";
import { getMousePosition } from "./input.js";
import { Point, point } from "./point.js";
import { RenderObject } from "./render.js";
import { toRadians } from "./utils.js";
import { vec } from "./vector.js";

type PointTuple = [x: number, y: number];

export class Polygon extends RenderObject {
  points: Array<Point> = [];
  rotation = 0;

  /**
   * Change the angle (rotation) of this polygon.
   */
  rotate(rotation: number) {
    this.rotateBy(rotation - this.rotation);
  }

  /**
   * Rotate the angle of this polygon by the given value.
   */
  rotateBy(rotation: number) {
    if (rotation === 0) return;

    const radians = toRadians(rotation);

    for (const point of this.points) {
      const x = point.x;
      const y = point.y;

      const rotatedX = x * Math.cos(radians) - y * Math.sin(radians);
      const rotatedY = x * Math.sin(radians) + y * Math.cos(radians);

      point.x = rotatedX;
      point.y = rotatedY;
    }

    this.rotation += rotation;
  }

  /**
   * Returns true if one of the lines of this polygon intersect with one of the lines of the given polygon or
   * one of the polygon's position is within the other polygon's shape.
   */
  intersects(other: Polygon) {
    if (other === this || !this.isValid() || !other.isValid()) {
      return false;
    }

    if (other.contains(this.x, this.y)) {
      return true;
    }

    if (this.contains(other.x, other.y)) {
      return true;
    }

    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.points[i];
      const p2 = this.points[(i + 1) % this.points.length];

      const x1 = p1.x + this.x;
      const y1 = p1.y + this.y;
      const x2 = p2.x + this.x;
      const y2 = p2.y + this.y;

      for (let j = 0; j < other.points.length; j++) {
        const p3 = other.points[j];
        const p4 = other.points[(j + 1) % other.points.length];

        const x3 = p3.x + other.x;
        const y3 = p3.y + other.y;
        const x4 = p4.x + other.x;
        const y4 = p4.y + other.y;

        if (linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Returns true if the given position is inside this polygon.
   */
  contains(x: number, y: number) {
    let crossings = 0;

    for (let i = 0; i < this.points.length; i++) {
      const a = this.points[i];
      const b = this.points[(i + 1) % this.points.length];

      const x1 = a.x + this.x;
      const y1 = a.y + this.y;
      const x2 = b.x + this.x;
      const y2 = b.y + this.y;

      // Use ray-casting (a horizontal line from the given point to, well almost, infinity) to count how many times it intersects.
      if (linesIntersect(x, y, Number.MAX_SAFE_INTEGER, y, x1, y1, x2, y2)) {
        crossings++;
      }
    }

    // If the point is inside the polygon, the ray will enter and exit the polygon an odd number of times.
    return crossings % 2 === 1;
  }

  /**
   * Returns true if the mouse is inside this polygon.
   */
  containsMouse(inWorld: boolean) {
    const mouse = getMousePosition(inWorld);
    return this.contains(mouse.x, mouse.y);
  }

  /**
   * A convex polygon is valid when it has three or more points.
   */
  isValid() {
    return this.points.length >= 3;
  }

  /**
   * Change this polygon's shape to the given rectangle.
   */
  toRect(x: number, y: number, w: number, h: number) {
    this.points.length = 0;
    this.points.push(
      point(x, y),
      point(x + w, y),
      point(x + w, y + h),
      point(x, y + h),
    );
  }

  /**
   * Draw this polygon to the canvas.
   */
  draw() {
    if (!this.isValid()) return;

    super.draw();

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    ctx.closePath();

    if (this.fill) {
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }
}

/**
 * Create a new convex polygon.
 */
export function polygon(x = 0, y = 0, points: Array<PointTuple> = []) {
  const p = new Polygon();

  p.x = x;
  p.y = y;
  p.points = points.map(([x, y]) => vec(x, y));

  return p;
}
