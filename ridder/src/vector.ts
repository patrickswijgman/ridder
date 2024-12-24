import { getDistance, lerp, toRadians } from "./utils.js";

export type Vector = {
  x: number;
  y: number;
};

/**
 * Create a new vector data structure.
 * A vector is a point in 2D space with an x and y coordinate.
 */
export function vec(x = 0, y = 0): Vector {
  return { x, y };
}

/**
 * Set the components of the vector and returns the vector.
 */
export function setVector(v: Vector, x: number, y: number) {
  v.x = x;
  v.y = y;
  return v;
}

/**
 * Add vector {@link b} to vector {@link a} and returns vector {@link a}.
 */
export function addVector(a: Vector, b: Vector) {
  a.x += b.x;
  a.y += b.y;
  return a;
}

/**
 * Add vector {@link b} to vector {@link a} scaled by {@link s} and returns vector {@link a}.
 *
 * @example
 * // Helpful when you need to scale it by the current delta. This saves you the trouble of creating another vector for the scaled version.
 * addVectorScaled(position, velocity, getDelta());
 */
export function addVectorScaled(a: Vector, b: Vector, s: number) {
  a.x += b.x * s;
  a.y += b.y * s;
  return a;
}

/**
 * Subtract vector {@link b} from vector {@link a} and returns vector {@link a}.
 */
export function subtractVector(a: Vector, b: Vector) {
  a.x -= b.x;
  a.y -= b.y;
  return a;
}

/**
 * Subtract vector {@link b} from vector {@link a} scaled by {@link s} and returns vector {@link a}.
 *
 * @example
 * // Helpful when you need to scale it by the current delta. This saves you the trouble of creating another vector for the scaled version.
 * subtractVectorScaled(position, velocity, getDelta());
 */
export function subtractVectorScaled(a: Vector, b: Vector, s: number) {
  a.x -= b.x * s;
  a.y -= b.y * s;
  return a;
}

/**
 * Scale the vector by the given scalar and returns the vector.
 */
export function scaleVector(v: Vector, s: number) {
  v.x *= s;
  v.y *= s;
  return v;
}

/**
 * Reset the vector's components back to zero and returns the vector.
 */
export function resetVector(v: Vector) {
  v.x = 0;
  v.y = 0;
  return v;
}

/**
 * Copy the components of vector {@link b} into vector {@link a} and returns vector {@link a}.
 */
export function copyVector(a: Vector, b: Vector) {
  a.x = b.x;
  a.y = b.y;
  return a;
}

/**
 * Point the vector in the direction of the given angle in degrees and returns the vector.
 */
export function angleVector(v: Vector, degrees: number) {
  const angle = toRadians(degrees);
  const len = getVectorLength(v);
  v.x = Math.cos(angle) * len;
  v.y = Math.sin(angle) * len;
  return v;
}

/**
 * Linearly interpolate the vector {@link v} to the value {@link to} using the scalar value {@link t} and returns the vector.
 */
export function lerpVector(v: Vector, to: number, t: number) {
  v.x = lerp(v.x, to, t);
  v.y = lerp(v.y, to, t);
  return v;
}

/**
 * Normalize the vector, making it's length 1 and returns the vector.
 */
export function normalizeVector(v: Vector) {
  const len = getVectorLength(v);
  if (len === 0) {
    return v;
  }
  v.x /= len;
  v.y /= len;
  return v;
}

/**
 * Limit the vector's length by the given value.
 */
export function limitVector(v: Vector, max: number) {
  const len = getVectorLength(v);
  if (len > max) {
    scaleVector(normalizeVector(v), max);
  }
  return v;
}

/**
 * Create a new vector data structure using the given vector's components.
 */
export function cloneVector(v: Vector) {
  return vec(v.x, v.y);
}

/**
 * Get the length (magnitude) of the vector.
 */
export function getVectorLength(v: Vector) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

/**
 * Get the distance between vector {@link a} and vector {@link b}.
 */
export function getVectorDistance(a: Vector, b: Vector) {
  return getDistance(a.x, a.y, b.x, b.y);
}
