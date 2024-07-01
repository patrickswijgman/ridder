import { linesIntersect } from "./geom.js";
import { getMousePosition } from "./input.js";
import { Rect } from "./rect.js";
import { toRadians } from "./utils.js";
import { Vec, vec } from "./vector.js";

type PointTuple = [x: number, y: number];

export class Polygon {
  constructor(
    /** The position of this polygon. */
    public position: Vec,
    /** The points that make up this convex polygon. */
    public points: Array<Vec>,
    /** The pivot point of this polygon. */
    public pivot: Vec,
  ) {}

  /**
   * Move the position of this polygon by the given amount.
   */
  move(x: number, y: number) {
    this.position.x += x;
    this.position.y += y;
    return this;
  }

  /**
   * Change this polygon's shape to the given points.
   */
  reshape(points: Array<PointTuple>) {
    this.points = points.map(([x, y]) => vec(x, y));
    return this;
  }

  /**
   * Change the angle (rotation) of this polygon.
   */
  rotate(angle: number) {
    const radians = toRadians(angle);

    for (const point of this.points) {
      const x = point.x - this.pivot.x;
      const y = point.y - this.pivot.y;
      const rotatedX = x * Math.cos(radians) - y * Math.sin(radians);
      const rotatedY = x * Math.sin(radians) + y * Math.cos(radians);

      point.x = rotatedX + this.pivot.x;
      point.y = rotatedY + this.pivot.y;
    }

    return this;
  }

  /**
   * Change this polygon's shape to the given rectangle.
   */
  rect(rect: Rect) {
    this.pivot.copy(rect.pivot);
    this.reshape([
      [0, 0],
      [rect.width, 0],
      [rect.width, rect.height],
      [0, rect.height],
    ]);

    return this;
  }

  /**
   * Returns true if one of the lines of this polygon intersect with one of the lines of the given polygon.
   */
  intersects(other: Polygon) {
    if (other === this || !this.isValid() || !other.isValid()) {
      return false;
    }

    if (other.contains(this.x, this.y)) {
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

  get x() {
    return this.position.x - this.pivot.x;
  }
  get y() {
    return this.position.y - this.pivot.y;
  }

  /**
   * A Polygon is valid when it has three or more points.
   */
  isValid() {
    return this.points.length >= 3;
  }

  /**
   * Clone this Polygon.
   */
  clone() {
    return new Polygon(
      this.position.clone(),
      this.points.map((point) => point.clone()),
      this.pivot.clone(),
    );
  }
}

/**
 * Create a new polygon.
 *
 * A polygon consists of three components:
 * - the (x,y) position
 * - the array of clock-wise points ([x,y] tuples) that make up the shape.
 * - the (pivotX, pivotY) pivot point (relative to position)
 */
export function polygon(
  x = 0,
  y = 0,
  points: Array<PointTuple> = [],
  pivotX = 0,
  pivotY = 0,
) {
  return new Polygon(
    vec(x, y),
    points.map(([x, y]) => vec(x, y)),
    vec(pivotX, pivotY),
  );
}
