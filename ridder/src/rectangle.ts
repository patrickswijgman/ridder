import { random } from "./utils.js";
import { getVectorLength, setVector, Vector } from "./vector.js";

export type Rectangle = {
  x: number;
  y: number;
  w: number;
  h: number;
};

/**
 * Create a new rectangle data structure.
 * @param x - The x-coordinate.
 * @param y - The y-coordinate.
 * @param w - The width.
 * @param h - The height.
 */
export function rect(x = 0, y = 0, w = 0, h = 0): Rectangle {
  return { x, y, w, h };
}

/**
 * Set the components of the rectangle and returns the rectangle.
 */
export function setRectangle(r: Rectangle, x: number, y: number, w: number, h: number) {
  r.x = x;
  r.y = y;
  r.w = w;
  r.h = h;
  return r;
}

/**
 * Returns `true` if the rectangle has a width and height larger than 0.
 */
export function isRectangleValid(r: Rectangle) {
  return r.w > 0 && r.h > 0;
}

/**
 * Returns `true` when the rectangles {@link a} and {@link b} intersect (overlap).
 */
export function doRectanglesIntersect(a: Rectangle, b: Rectangle) {
  if (a === b || !isRectangleValid(a) || !isRectangleValid(b)) {
    return false;
  }

  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

/**
 * Returns `true` when {@link x} and {@link y} are inside the rectangle {@link r}.
 */
export function doesRectangleContain(r: Rectangle, x: number, y: number) {
  return x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h;
}

/**
 * Write the intersection (overlap) result between the rectangles {@link a} and {@link b} into the vector {@link out}.
 *
 * NOTE - This does not reset the vector {@link out} so this function can be used to accumulate the intersection result.
 *
 * @see {@link https://github.com/patrickswijgman/ridder/blob/main/examples/platformer/index.ts#L136} for an example.
 *
 * @param velocity - The velocity of rectangle {@link a}
 */
export function writeIntersectionBetweenRectangles(a: Rectangle, b: Rectangle, velocity: Vector, out: Vector): Vector {
  if (!getVectorLength(velocity) || !doRectanglesIntersect(a, b)) {
    return out;
  }

  const l = a.x + a.w - b.x;
  const r = b.x + b.w - a.x;
  const u = a.y + a.h - b.y;
  const d = b.y + b.h - a.y;

  switch (true) {
    case velocity.x > 0 && velocity.y > 0:
      if (l > u) {
        out.y -= u;
      } else {
        out.x -= l;
      }
      break;

    case velocity.x < 0 && velocity.y > 0:
      if (r > u) {
        out.y -= u;
      } else {
        out.x += r;
      }
      break;

    case velocity.x > 0 && velocity.y < 0:
      if (l > d) {
        out.y += d;
      } else {
        out.x -= l;
      }
      break;

    case velocity.x < 0 && velocity.y < 0:
      if (r > d) {
        out.y += d;
      } else {
        out.x += r;
      }
      break;

    case velocity.x > 0:
      out.x -= l;
      break;

    case velocity.x < 0:
      out.x += r;
      break;

    case velocity.y > 0:
      out.y -= u;
      break;

    case velocity.y < 0:
      out.y += d;
      break;
  }

  return out;
}

/**
 * Write the result of a random point between the inner and outer rectangles.
 */
export function writeRandomPointInPerimeterBetweenRectangles(outer: Rectangle, inner: Rectangle, out: Vector) {
  let x = 0;
  let y = 0;

  const region = random(0, 3);
  switch (region) {
    case 0:
      x = random(outer.x, outer.x + outer.w);
      y = random(outer.y, inner.y);
      break;

    case 1:
      x = random(outer.x, outer.x + outer.w);
      y = random(inner.y + inner.h, outer.y + outer.h);
      break;

    case 2:
      x = random(outer.x, inner.x);
      y = random(inner.y, inner.y + inner.h);
      break;

    case 3:
      x = random(inner.x + inner.w, outer.x + outer.w);
      y = random(inner.y, inner.y + inner.h);
      break;
  }

  setVector(out, x, y);
}

/**
 * Copy the data components of rectangle {@link b} into rectangle {@link a} and returns rectangle {@link a}.
 */
export function copyRectangle(a: Rectangle, b: Rectangle) {
  a.x = b.x;
  a.y = b.y;
  a.w = b.w;
  a.h = b.h;
  return a;
}
