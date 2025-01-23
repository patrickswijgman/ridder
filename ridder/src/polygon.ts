import { doLinesIntersect } from "./line.js";
import { toRadians } from "./utils.js";
import { cloneVector, vec, Vector } from "./vector.js";

export type Polygon = {
  x: number;
  y: number;
  basePoints: Array<Vector>;
  calcPoints: Array<Vector>;
};

/**
 * Create a new polygon data structure.
 * @param x - The x-coordinate.
 * @param y - The y-coordinate.
 * @param points - An array of {@link Vector} points to create the convex polygon.
 */
export function polygon(x = 0, y = 0, points: Array<Vector> = []): Polygon {
  return {
    x,
    y,
    basePoints: points,
    calcPoints: points.map(cloneVector),
  };
}

/**
 * Create a new polygon from a rectangle.
 * @param rx - The x-coordinate of the rectangle.
 * @param ry - The y-coordinate of the rectangle.
 * @param rw - The width of the rectangle.
 * @param rh - The height of the rectangle
 */
export function polygonFromRect(x: number, y: number, rx: number, ry: number, rw: number, rh: number) {
  return polygon(x, y, getPointsFromRect(rx, ry, rw, rh));
}

/**
 * Create a new polygon from a circle.
 * @param cx - The x-coordinate of the circle.
 * @param cy - The y-coordinate of the circle.
 * @param cr - The radius of the circle.
 * @param segments - The number of segments to create the polygon, e.g. 3 creates a triangle.
 */
export function polygonFromCircle(x: number, y: number, cx: number, cy: number, cr: number, segments: number) {
  return polygon(x, y, getPointsFromCircle(cx, cy, cr, segments));
}

/**
 * Set the components of the polygon and returns the polygon.
 */
export function setPolygon(p: Polygon, x: number, y: number, points: Array<Vector>) {
  p.x = x;
  p.y = y;
  p.basePoints = points.map(cloneVector);
  p.calcPoints = points.map(cloneVector);
  return p;
}

/**
 * Set the components of the polygon from a rectangle and returns the polygon.
 * @param rx - The x-coordinate of the rectangle.
 * @param ry - The y-coordinate of the rectangle.
 * @param rw - The width of the rectangle.
 * @param rh - The height of the rectangle
 */
export function setPolygonFromRect(p: Polygon, x: number, y: number, rx: number, ry: number, rw: number, rh: number) {
  const points = getPointsFromRect(rx, ry, rw, rh);
  p.x = x;
  p.y = y;
  p.basePoints = points;
  p.calcPoints = points.map(cloneVector);
}

/**
 * Set the components of the polygon from a circle and returns the polygon.
 * @param cx - The x-coordinate of the circle.
 * @param cy - The y-coordinate of the circle.
 * @param cr - The radius of the circle.
 * @param segments - The number of segments to create the polygon, e.g. 3 creates a triangle.
 */
export function setPolygonFromCircle(p: Polygon, x: number, y: number, cx: number, cy: number, cr: number, segments: number) {
  const points = getPointsFromCircle(cx, cy, cr, segments);
  p.x = x;
  p.y = y;
  p.basePoints = points;
  p.calcPoints = points.map(cloneVector);
}

/**
 * Returns an array of points to create a polygon from a rectangle.
 * @param x - The x-coordinate of the rectangle.
 * @param y - The y-coordinate of the rectangle.
 * @param w - The width of the rectangle.
 * @param h - The height of the rectangle.
 */
function getPointsFromRect(x: number, y: number, w: number, h: number) {
  return [vec(x, y), vec(x + w, y), vec(x + w, y + h), vec(x, y + h)];
}

/**
 * Returns an array of points to create a polygon from a circle.
 * @param x - The x-coordinate of the circle.
 * @param y - The y-coordinate of the circle.
 * @param r - The radius of the circle.
 * @param segments - The number of segments to create the polygon, e.g. 3 creates a triangle.
 */
function getPointsFromCircle(x: number, y: number, r: number, segments: number) {
  const points: Array<Vector> = [];
  const step = 360 / segments;

  for (let degrees = 0; degrees < 360; degrees += step) {
    const radians = toRadians(degrees);
    const pointX = x + Math.cos(radians) * r;
    const pointY = y + Math.sin(radians) * r;
    points.push(vec(pointX, pointY));
  }

  return points;
}

/**
 * Returns `true` when the polygon has 3 or more points.
 */
export function isPolygonValid(p: Polygon) {
  return p.basePoints.length >= 3;
}

/**
 * Rotate the polygon to the given angle in degrees.
 */
export function setPolygonAngle(p: Polygon, angle: number) {
  const radians = toRadians(angle);

  for (let i = 0; i < p.basePoints.length; i++) {
    const base = p.basePoints[i];
    const calc = p.calcPoints[i];
    const rotatedX = base.x * Math.cos(radians) - base.y * Math.sin(radians);
    const rotatedY = base.x * Math.sin(radians) + base.y * Math.cos(radians);
    calc.x = rotatedX;
    calc.y = rotatedY;
  }
}

/**
 * Returns `true` when the polygons {@link a} and {@link b} intersect (overlap).
 */
export function doPolygonsIntersect(a: Polygon, b: Polygon) {
  if (a === b || !isPolygonValid(a) || !isPolygonValid(b)) {
    return false;
  }

  if (doesPolygonContain(a, b.x, b.y) || doesPolygonContain(b, a.x, a.y)) {
    return true;
  }

  for (let i = 0; i < a.calcPoints.length; i++) {
    const p1 = a.calcPoints[i];
    const p2 = a.calcPoints[(i + 1) % a.calcPoints.length];
    const x1 = p1.x + a.x;
    const y1 = p1.y + a.y;
    const x2 = p2.x + a.x;
    const y2 = p2.y + a.y;

    for (let j = 0; j < b.calcPoints.length; j++) {
      const p3 = b.calcPoints[j];
      const p4 = b.calcPoints[(j + 1) % b.calcPoints.length];
      const x3 = p3.x + b.x;
      const y3 = p3.y + b.y;
      const x4 = p4.x + b.x;
      const y4 = p4.y + b.y;

      if (doLinesIntersect(x1, y1, x2, y2, x3, y3, x4, y4)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Returns `true` when {@link x} and {@link y} are inside the polygon {@link p}.
 */
export function doesPolygonContain(p: Polygon, x: number, y: number) {
  let crossings = 0;

  for (let i = 0; i < p.calcPoints.length; i++) {
    const a = p.calcPoints[i];
    const b = p.calcPoints[(i + 1) % p.calcPoints.length];
    const x1 = a.x + p.x;
    const y1 = a.y + p.y;
    const x2 = b.x + p.x;
    const y2 = b.y + p.y;

    if (doLinesIntersect(x, y, Number.MAX_SAFE_INTEGER, y, x1, y1, x2, y2)) {
      crossings++;
    }
  }

  return crossings % 2 === 1;
}

/**
 * Copy the data components of polygon {@link b} into polygon {@link a} and returns polygon {@link a}.
 */
export function copyPolygon(a: Polygon, b: Polygon) {
  a.x = b.x;
  a.y = b.y;
  a.basePoints = b.basePoints.map(cloneVector);
  a.calcPoints = b.calcPoints.map(cloneVector);
  return a;
}
