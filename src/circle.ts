import { BaseObject } from "./base.js";
import { ctx } from "./canvas.js";
import { getMousePosition } from "./input.js";
import { getDistance } from "./utils.js";

export class Circle extends BaseObject {
  /** The radius of this circle. */
  r = 0;

  /**
   * Returns true if this circle intersects with the given circle.
   */
  intersects(other: Circle) {
    if (other === this || !this.isValid() || !other.isValid()) {
      return false;
    }

    const d = getDistance(this.x, this.y, other.x, other.y);
    const r = this.r + other.r;

    return d < r;
  }

  /**
   * Returns true if the given position is inside this circle.
   */
  contains(x: number, y: number) {
    return getDistance(this.x, this.y, x, y) < this.r;
  }

  /**
   * Returns true if the mouse is inside this circle.
   */
  containsMouse(inWorld: boolean) {
    const mouse = getMousePosition(inWorld);
    return this.contains(mouse.x, mouse.y);
  }

  /**
   * A circle is valid if its radius is larger than zero.
   */
  isValid() {
    return this.r > 0;
  }

  /**
   * Draw this circle to the canvas.
   */
  draw() {
    if (!this.isValid()) return;

    super.draw();

    ctx.beginPath();
    ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
    ctx.closePath();

    if (this.fill) {
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }
}

/**
 * Create a new circle.
 */
export function circle(x = 0, y = 0, r = 0) {
  const c = new Circle();

  c.x = x;
  c.y = y;
  c.r = r;

  return c;
}
