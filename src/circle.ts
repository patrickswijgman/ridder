import { getMousePosition } from "./input.js";
import { getDistance } from "./utils.js";
import { Vec, vec } from "./vector.js";

/**
 * Data class for a circle.
 */
export class Circle {
  constructor(
    /** The position (center) of this circle. */
    public position: Vec,
    /** The radius (size) of this circle. */
    public radius: number,
  ) {}

  /**
   * Move the position of this circle by the given amount.
   */
  move(x: number, y: number) {
    this.position.x += x;
    this.position.y += y;
    return this;
  }

  /**
   * Set the size of this rectangle.
   */
  resize(radius: number) {
    this.radius = radius;
    return this;
  }

  /**
   * Returns true if this circle intersects with the given circle.
   */
  intersects(other: Circle) {
    if (other === this || !other.isValid()) {
      return false;
    }

    const d = getDistance(this.x, this.y, other.x, other.y);
    const r = this.radius + other.radius;

    return d < r;
  }

  /**
   * Returns true if the given position is inside this circle.
   */
  contains(x: number, y: number) {
    return getDistance(this.x, this.y, x, y) < this.radius;
  }

  /**
   * Returns true if the mouse is inside this circle.
   */
  containsMouse(inWorld: boolean) {
    const mouse = getMousePosition(inWorld);
    return this.contains(mouse.x, mouse.y);
  }

  get x() {
    return this.position.x;
  }
  get y() {
    return this.position.y;
  }

  /**
   * A circle is valid if its radius is larger than zero.
   */

  isValid() {
    return this.radius > 0;
  }

  /**
   * Clone this circle.
   */
  clone() {
    return new Circle(this.position.clone(), this.radius);
  }
}

/**
 * Create a new circle.
 */
export function circle(x = 0, y = 0, radius = 0) {
  return new Circle(vec(x, y), radius);
}
