import { getMousePosition } from "./input.js";
import { getDistance } from "./utils.js";
import { Vec, vec } from "./vector.js";

export class Circle {
  constructor(
    /** The position of this circle. */
    public position: Vec,
    /** The radius (size) of this circle. */
    public radius: number,
    /** The pivot point of this circle. */
    public pivot: Vec,
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
   * Set the pivot point of this circle using an anchor string.
   */
  anchor(anchor: "top" | "right" | "bottom" | "left" | "center") {
    const r = this.radius;

    switch (anchor) {
      case "top":
        this.pivot.set(0, -r);
        break;
      case "right":
        this.pivot.set(r, 0);
        break;
      case "bottom":
        this.pivot.set(0, r);
        break;
      case "left":
        this.pivot.set(-r, 0);
        break;
      case "center":
        this.pivot.set(0, 0);
        break;
    }

    return this;
  }

  /**
   * Returns true if this circle intersects with the given circle.
   */
  intersects(other: Circle) {
    if (other === this || !this.isValid() || !other.isValid()) {
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
    return this.position.x - this.pivot.x;
  }
  get y() {
    return this.position.y - this.pivot.y;
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
    return new Circle(this.position.clone(), this.radius, this.pivot.clone());
  }
}

/**
 * Create a new circle.
 *
 * A circle consists of three components:
 * - the (x,y) position
 * - the radius
 * - the (pivotX, pivotY) pivot point (relative to position)
 */
export function circle(x = 0, y = 0, radius = 0, pivotX = 0, pivotY = 0) {
  return new Circle(vec(x, y), radius, vec(pivotX, pivotY));
}
