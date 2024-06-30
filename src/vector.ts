import { getAngle, getDistance } from "./utils.js";

export class Vec {
  constructor(
    public x: number,
    public y: number,
  ) {}

  /**
   * Add the given vector to this vector, optionally scaling the given vector's components before adding them.
   */
  add(other: Vec, scale = 1) {
    this.x += other.x * scale;
    this.y += other.y * scale;
    return this;
  }

  /**
   * Subtract the given vector from this vector, optionally scaling the given vector's components before subtracting them.
   */
  subtract(other: Vec, scale = 1) {
    this.x -= other.x * scale;
    this.y -= other.y * scale;
    return this;
  }

  /**
   * Scale the components of this vector by the given scalar.
   */
  scale(value: number) {
    this.x *= value;
    this.y *= value;
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
  copy(other: Vec) {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  /**
   * Limit the length of this vector by the given value.
   */
  limit(value: number) {
    return this.length() > value ? this.normalize().scale(value) : this;
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
  distance(other: Vec) {
    return getDistance(this.x, this.y, other.x, other.y);
  }

  /**
   * Get the angle in degrees from this vector to the given vector.
   */
  angle(other: Vec) {
    return getAngle(this.x, this.y, other.x, other.y);
  }

  /**
   * Returns true if this vector has the same values as the given vector.
   */
  equals(other: Vec) {
    return this.x == other.x && this.y == other.y;
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
