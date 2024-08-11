import { getVectorLength, Vector } from "./vector.js";

export type Rectangle = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export function rect(x = 0, y = 0, w = 0, h = 0): Rectangle {
  return { x, y, w, h };
}

export function isRectangleValid(r: Rectangle) {
  return r.w > 0 && r.h > 0;
}

export function doRectanglesIntersect(a: Rectangle, b: Rectangle) {
  if (a === b || !isRectangleValid(a) || !isRectangleValid(b)) {
    return false;
  }

  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

export function doesRectangleContain(r: Rectangle, x: number, y: number) {
  return x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h;
}

export function resolveIntersectionBetweenRectangles(
  a: Rectangle,
  b: Rectangle,
  velocity: Vector,
  result?: Vector,
) {
  if (!getVectorLength(velocity) || !doRectanglesIntersect(a, b)) {
    return false;
  }

  const l = a.x + a.w - b.x;
  const r = b.x + b.w - a.x;
  const u = a.y + a.h - b.y;
  const d = b.y + b.h - a.y;

  switch (true) {
    case velocity.x > 0 && velocity.y > 0:
      if (l > u) {
        resolveOverlap(a, 0, -u, result);
      } else {
        resolveOverlap(a, -l, 0, result);
      }
      return true;

    case velocity.x < 0 && velocity.y > 0:
      if (r > u) {
        resolveOverlap(a, 0, -u, result);
      } else {
        resolveOverlap(a, r, 0, result);
      }
      return true;

    case velocity.x > 0 && velocity.y < 0:
      if (l > d) {
        resolveOverlap(a, 0, d, result);
      } else {
        resolveOverlap(a, -l, 0, result);
      }
      return true;

    case velocity.x < 0 && velocity.y < 0:
      if (r > d) {
        resolveOverlap(a, 0, d, result);
      } else {
        resolveOverlap(a, r, 0, result);
      }
      return true;

    case velocity.x > 0:
      resolveOverlap(a, -l, 0, result);
      return true;

    case velocity.x < 0:
      resolveOverlap(a, r, 0, result);
      return true;

    case velocity.y > 0:
      resolveOverlap(a, 0, -u, result);
      return true;

    case velocity.y < 0:
      resolveOverlap(a, 0, d, result);
      return true;

    default:
      return false;
  }
}

function resolveOverlap(r: Rectangle, x: number, y: number, result?: Vector) {
  r.x += x;
  r.y += y;

  if (result) {
    result.x += x;
    result.y += y;
  }
}
