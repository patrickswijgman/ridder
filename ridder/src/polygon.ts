import { Circle } from "./circle.js";
import { doLinesIntersect } from "./line.js";
import { Rectangle } from "./rectangle.js";
import { toRadians } from "./utils.js";
import { vec, Vector } from "./vector.js";

export type Polygon = {
  x: number;
  y: number;
  points: Array<Vector>;
};

export function polygon(x = 0, y = 0, points: Array<Vector> = []): Polygon {
  return { x, y, points };
}

export function polygonFromRect(x: number, y: number, r: Rectangle) {
  return polygon(x, y, [vec(r.x, r.y), vec(r.x + r.w, r.y), vec(r.x + r.w, r.y + r.h), vec(r.x, r.y + r.h)]);
}

export function polygonFromCircle(x: number, y: number, c: Circle, segments: number) {
  const points: Array<Vector> = [];
  const step = 360 / segments;

  for (let degrees = 0; degrees < 360; degrees += step) {
    const radians = toRadians(degrees);
    const x = c.x + Math.cos(radians) * c.r;
    const y = c.y + Math.sin(radians) * c.r;
    points.push(vec(x, y));
  }

  return polygon(x, y, points);
}

export function isPolygonValid(p: Polygon) {
  return p.points.length >= 3;
}

export function rotatePolygon(p: Polygon, degrees: number) {
  if (degrees === 0) return;

  const radians = toRadians(degrees);

  for (const point of p.points) {
    const x = point.x;
    const y = point.y;
    const rotatedX = x * Math.cos(radians) - y * Math.sin(radians);
    const rotatedY = x * Math.sin(radians) + y * Math.cos(radians);
    point.x = rotatedX;
    point.y = rotatedY;
  }
}

export function doPolygonsIntersect(a: Polygon, b: Polygon) {
  if (a === b || !isPolygonValid(a) || !isPolygonValid(b)) {
    return false;
  }

  if (doesPolygonContain(a, b.x, b.y) || doesPolygonContain(b, a.x, a.y)) {
    return true;
  }

  for (let i = 0; i < a.points.length; i++) {
    const p1 = a.points[i];
    const p2 = a.points[(i + 1) % a.points.length];
    const x1 = p1.x + a.x;
    const y1 = p1.y + a.y;
    const x2 = p2.x + a.x;
    const y2 = p2.y + a.y;

    for (let j = 0; j < b.points.length; j++) {
      const p3 = b.points[j];
      const p4 = b.points[(j + 1) % b.points.length];
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

export function doesPolygonContain(p: Polygon, x: number, y: number) {
  let crossings = 0;

  for (let i = 0; i < p.points.length; i++) {
    const a = p.points[i];
    const b = p.points[(i + 1) % p.points.length];
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
