import { getDistance } from "./utils.js";

export type Circle = {
  x: number;
  y: number;
  r: number;
};

/**
 * Create a new circle data structure.
 * @param x - The x-coordinate.
 * @param y - The y-coordinate.
 * @param r - The radius.
 */
export function circle(x = 0, y = 0, r = 0): Circle {
  return { x, y, r };
}

/**
 * Set the components of the circle and returns the circle.
 */
export function setCircle(c: Circle, x: number, y: number, r: number) {
  c.x = x;
  c.y = y;
  c.r = r;
  return c;
}

/**
 * Returns `true` if the circle has a radius larger than 0.
 */
export function isCircleValid(c: Circle) {
  return c.r > 0;
}

/**
 * Returns `true` when the circles {@link a} and {@link b} intersect (overlap).
 */
export function doCirclesIntersect(a: Circle, b: Circle) {
  if (a === b || !isCircleValid(a) || !isCircleValid(b)) {
    return false;
  }

  return getDistance(a.x, a.y, b.x, b.y) < a.r + b.r;
}

/**
 * Returns `true` when {@link x} and {@link y} are inside the circle {@link c}.
 */
export function doesCircleContain(c: Circle, x: number, y: number) {
  return getDistance(c.x, c.y, x, y) < c.r;
}

/**
 * Copy the data components of circle {@link b} into circle {@link a} and returns polygon {@link a}.
 */
export function copyCircle(a: Circle, b: Circle) {
  a.x = b.x;
  a.y = b.y;
  a.r = b.r;
  return a;
}
