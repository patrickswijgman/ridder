import { getMousePosition } from "./input.js";
import { Vec, vec } from "./vector.js";

/**
 * Data class for a rectangle.
 */
export class Rect {
  constructor(
    /** The position (top-left corner) of the rectangle. */
    public position: Vec,
    /** The size (bottom-right corner) of the rectangle, relative to the position. */
    public size: Vec,
    /** The pivot point of the rectangle, relative to the position. */
    public pivot: Vec,
  ) {}

  /**
   * Move this rectangle by the given amount.
   */
  move(x: number, y: number) {
    this.position.x += x;
    this.position.y += y;
    return this;
  }

  /**
   * Set the size of this rectangle.
   */
  resize(width: number, height: number) {
    this.size.set(width, height);
    return this;
  }

  /**
   * Set the pivot point of this rectangle using an anchor string.
   */
  anchor(
    anchor:
      | "top_left"
      | "top_center"
      | "top_right"
      | "middle_left"
      | "middle_center"
      | "middle_right"
      | "bottom_left"
      | "bottom_center"
      | "bottom_right",
  ) {
    const w = this.size.x;
    const h = this.size.y;

    switch (anchor) {
      case "top_left":
        this.pivot.set(0, 0);
        break;
      case "top_center":
        this.pivot.set(w / 2, 0);
        break;
      case "top_right":
        this.pivot.set(w, 0);
        break;

      case "middle_left":
        this.pivot.set(0, h / 2);
        break;
      case "middle_center":
        this.pivot.set(w / 2, h / 2);
        break;
      case "middle_right":
        this.pivot.set(w, h / 2);
        break;

      case "bottom_left":
        this.pivot.set(0, h);
        break;
      case "bottom_center":
        this.pivot.set(w / 2, h);
        break;
      case "bottom_right":
        this.pivot.set(w, h);
        break;
    }

    return this;
  }

  /**
   * Returns true if this rectangle intersects with the given rectangle.
   */
  intersects(other: Rect) {
    if (other === this) {
      return false;
    }

    return (
      this.left < other.right &&
      this.right > other.left &&
      this.top < other.bottom &&
      this.bottom > other.top
    );
  }

  /**
   * Returns true if the given position is inside this rectangle.
   */
  contains(x: number, y: number) {
    return x > this.left && x < this.right && y > this.top && y < this.bottom;
  }

  /**
   * Returns true if the mouse is inside this rectangle.
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
  get width() {
    return this.size.x;
  }
  get height() {
    return this.size.y;
  }

  get left() {
    return this.x;
  }
  get top() {
    return this.y;
  }
  get right() {
    return this.x + this.width;
  }
  get bottom() {
    return this.y + this.height;
  }

  /**
   * Clone this rectangle.
   */
  clone() {
    return new Rect(
      this.position.clone(),
      this.size.clone(),
      this.pivot.clone(),
    );
  }
}

/**
 * Create a new rectangle.
 *
 * A rectangle consists of three vector points:
 * - the (x,y) position (top-left corner)
 * - the (width,height) size (bottom-right corner, relative to position)
 * - the (pivotX,pivotY) pivot point (relative to position)
 */
export function rect(
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  pivotX = 0,
  pivotY = 0,
) {
  return new Rect(vec(x, y), vec(width, height), vec(pivotX, pivotY));
}
