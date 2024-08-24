import { getDistance } from "./utils.js";

export type Circle = {
  x: number;
  y: number;
  r: number;
};

export function circle(x = 0, y = 0, r = 0): Circle {
  return { x, y, r };
}

export function isCircleValid(c: Circle) {
  return c.r > 0;
}

export function doCirclesIntersect(a: Circle, b: Circle) {
  if (a === b || !isCircleValid(a) || !isCircleValid(b)) {
    return false;
  }

  return getDistance(a.x, a.y, b.x, b.y) < a.r + b.r;
}

export function doesCircleContain(c: Circle, x: number, y: number) {
  return getDistance(c.x, c.y, x, y) < c.r;
}
