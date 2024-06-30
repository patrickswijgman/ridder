import { getMousePosition } from "./input.js";
import { Rect } from "./rect.js";
import { Vec, vec } from "./vector.js";

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
   * Returns true if one of the lines of this polygon intersect with one of the lines of the given polygon.
   */
  intersects(other: Polygon) {
    if (other === this || !this.isValid() || !other.isValid()) {
      return false;
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

        if (this.intersectsLine(x1, y1, x2, y2, x3, y3, x4, y4)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Returns true if the two lines are intersecting.
   * source: https://paulbourke.net/geometry/pointlineplane/javascript.txt
   */
  private intersectsLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number,
  ) {
    // Check if none of the lines are of length 0.
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }

    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    // Lines are parallel.
    if (denominator === 0) {
      return false;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // Is the intersection along the segments?
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    return true;
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
      if (
        this.intersectsLine(x, y, Number.MAX_SAFE_INTEGER, y, x1, y1, x2, y2)
      ) {
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

  /**
   * Change this polygon's shape to the given rectangle.
   */
  fromRect(rect: Rect) {
    this.pivot.copy(rect.pivot);
    this.points.length = 0;
    this.points.push(
      vec(0, 0),
      vec(rect.width, 0),
      vec(rect.width, rect.height),
      vec(0, rect.height),
    );
  }
}

/**
 * Create a new polygon.
 *
 * A polygon consists of two components:
 * - the (x,y) position
 * - the array of clock-wise points ([x,y] tuples) that make up the shape.
 * - the (pivotX, pivotY) pivot point (relative to position)
 */
export function polygon(
  x = 0,
  y = 0,
  points: Array<[x: number, y: number]> = [],
  pivotX = 0,
  pivotY = 0,
) {
  return new Polygon(
    vec(x, y),
    points.map(([x, y]) => vec(x, y)),
    vec(pivotX, pivotY),
  );
}
