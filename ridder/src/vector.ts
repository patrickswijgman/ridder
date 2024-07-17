import { Point } from "./point.js";
import { getAngle, getDistance, toRadians } from "./utils.js";

export class Vec extends Point {
  /**
   * Add the given vector to this vector, optionally scaling the given vector's components before adding them.
   */
  add(other: Point, scale = 1) {
    this.x += other.x * scale;
    this.y += other.y * scale;
    return this;
  }

  /**
   * Subtract the given vector from this vector, optionally scaling the given vector's components before subtracting them.
   */
  subtract(other: Point, scale = 1) {
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
   * Set both the x and y components of this vector to the given value.
   */
  splat(value: number) {
    this.x = value;
    this.y = value;
    return this;
  }

  /**
   * Copy the components of the given vector.
   */
  copy(other: Point) {
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
   * Set the length (magnitude) of this vector.
   */
  setLength(length: number) {
    return this.normalize().scale(length);
  }

  /**
   * Get the angle in degrees from this vector to the given vector.
   */
  angle(other: Point) {
    return getAngle(this.x, this.y, other.x, other.y);
  }

  /**
   * Get the angle in degrees of this vector.
   */
  getAngle() {
    return getAngle(0, 0, this.x, this.y);
  }

  /**
   * Point this vector to the given angle in degrees.
   */
  setAngle(angle: number) {
    const len = this.length();
    const radians = toRadians(angle);
    this.x = len * Math.cos(radians);
    this.y = len * Math.sin(radians);
    return this;
  }

  /**
   * Get the distance from this vector to the given vector.
   */
  distance(other: Point) {
    return getDistance(this.x, this.y, other.x, other.y);
  }

  /**
   * Returns true if this vector has the same values as the given vector.
   */
  equals(other: Point) {
    return this.x == other.x && this.y == other.y;
  }

  /**
   * Clone this vector.
   */
  clone() {
    const v = new Vec();

    v.copy(this);

    return v;
  }
}

/**
 * Create a new vector.
 */
export function vec(x = 0, y = 0) {
  const v = new Vec();

  v.set(x, y);

  return v;
}
