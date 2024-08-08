import { getDistance } from "./utils.js";

export type Vector = {
  x: number;
  y: number;
};

export function vec(x = 0, y = 0): Vector {
  return { x, y };
}

export function addVector(a: Vector, b: Vector) {
  a.x += b.x;
  a.y += b.y;
  return a;
}

export function subtractVector(a: Vector, b: Vector) {
  a.x -= b.x;
  a.y -= b.y;
  return a;
}

export function scaleVector(v: Vector, s: number) {
  v.x *= s;
  v.y *= s;
  return v;
}

export function resetVector(v: Vector) {
  v.x = 0;
  v.y = 0;
  return v;
}

export function copyVector(a: Vector, b: Vector) {
  a.x = b.x;
  a.y = b.y;
  return a;
}

export function normalizeVector(v: Vector) {
  const len = getVectorLength(v);
  if (len === 0) {
    return v;
  }
  v.x /= len;
  v.y /= len;
  return v;
}

export function limitVector(v: Vector, max: number) {
  const len = getVectorLength(v);
  if (len > max) {
    scaleVector(normalizeVector(v), max);
  }
  return v;
}

export function cloneVector(v: Vector) {
  return vec(v.x, v.y);
}

export function getVectorLength(v: Vector) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function getVectorDistance(a: Vector, b: Vector) {
  return getDistance(a.x, a.y, b.x, b.y);
}
