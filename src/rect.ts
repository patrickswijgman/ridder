import { BaseObject } from "./base.js";
import { ctx } from "./canvas.js";
import { getMousePosition } from "./input.js";

export class Rect extends BaseObject {
  /** The width of this rectangle. */
  w = 0;
  /** The height of this rectangle. */
  h = 0;

  /**
   * Returns true if this rectangle intersects with the given rectangle.
   */
  intersects(other: Rect) {
    if (other === this || !this.isValid() || !other.isValid()) {
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

  get left() {
    return this.x;
  }
  get top() {
    return this.y;
  }
  get right() {
    return this.x + this.w;
  }
  get bottom() {
    return this.y + this.h;
  }

  /**
   * A rectangle is valid when it has a width or height larger than zero.
   */
  isValid() {
    return this.w > 0 || this.h > 0;
  }

  /**
   * Draw this rectangle to the canvas.
   */
  draw() {
    if (!this.isValid()) return;

    super.draw();

    if (this.fill) {
      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, this.w, this.h);
    } else {
      ctx.strokeStyle = this.color;
      ctx.strokeRect(0, 0, this.w, this.h);
    }
  }
}

/**
 * Create a new rectangle.
 */
export function rect(x = 0, y = 0, w = 0, h = 0) {
  const r = new Rect();

  r.x = x;
  r.y = y;
  r.w = w;
  r.h = h;

  return r;
}
