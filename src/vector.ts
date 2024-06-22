import { getAngle, getDistance } from "./utils.js";

/**
 * 2D Vector!
 */
export class Vec {
  constructor(
    public x: number,
    public y: number,
  ) {}

  /**
   * Add the given vector to this vector, optionally scaling the given vector.
   */
  add(v: Vec, d = 1) {
    this.x += v.x * d;
    this.y += v.y * d;
    return this;
  }

  /**
   * Subtract the given vector from this vector, optionally scaling the given vector.
   */
  subtract(v: Vec, d = 1) {
    this.x -= v.x * d;
    this.y -= v.y * d;
    return this;
  }

  /**
   * Scale the components of this vector by the given scalar.
   */
  scale(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  /**
   * Set the components of this vector.
   */
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  /**
   * Reset the vector back to zero.
   */
  reset() {
    this.x = 0;
    this.y = 0;
    return this;
  }

  /**
   * Copy the components of the given vector.
   */
  copy(v: Vec) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  /**
   * Limit the length of this vector by the given value.
   */
  limit(l: number) {
    return this.length() > l ? this.normalize().scale(l) : this;
  }

  /**
   * Normalize this vector; making its length a value of 1.
   */
  normalize() {
    const len = this.length();

    if (len === 0) {
      return this;
    }

    this.x /= len;
    this.y /= len;
    return this;
  }

  /**
   * Return the length (magnitude) of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Get the distance from this vector to the given vector.
   */
  distance(v: Vec) {
    return getDistance(this.x, this.y, v.x, v.y);
  }

  /**
   * Get the angle in degrees from this vector to the given vector.
   */
  angle(v: Vec) {
    return getAngle(this.x, this.y, v.x, v.y);
  }

  /**
   * Clone this vector.
   */
  clone() {
    return new Vec(this.x, this.y);
  }
}

/**
 * Create a new vector.
 */
export function vec(x = 0, y = 0) {
  return new Vec(x, y);
}
