import { Rect } from "./rect.js";
import { getSettings } from "./settings.js";
import { delta } from "./state.js";
import { vec } from "./vector.js";

export class Body extends Rect {
  /** The movement of the body that is applied each frame. */
  velocity = vec();
  /** The gravitational force of the body that is applied each frame. */
  gravity = vec();
  /** Set to true if this body does not move and does not resolve collisions. */
  isStatic = false;
  /** Whether or not this body is resting on top of another body beneath it. */
  isOnGround = false;

  /**
   * Apply the forces such as gravity and velocity to the body.
   */
  update() {
    this.isOnGround = false;

    if (this.isStatic) return;

    const settings = getSettings();

    this.gravity.add(settings.gravity, delta).limit(settings.gravityMax);
    this.velocity.add(this.gravity, delta);
    this.position.add(this.velocity, delta);
  }

  /**
   * Resolve a collision (intersection) between this body and the given body.
   * Returns true of the body has resolved a collision.
   */
  resolveCollision(other: Body) {
    if (this.isStatic || !this.velocity.length() || !this.intersects(other)) {
      return false;
    }

    const l = this.right - other.left;
    const r = other.right - this.left;
    const u = this.bottom - other.top;
    const d = other.bottom - this.top;

    switch (true) {
      case this.velocity.x > 0 && this.velocity.y > 0:
        if (l > u) {
          this.resolveOverlap(0, -u);
        } else {
          this.resolveOverlap(-l, 0);
        }
        return true;

      case this.velocity.x < 0 && this.velocity.y > 0:
        if (r > u) {
          this.resolveOverlap(0, -u);
        } else {
          this.resolveOverlap(r, 0);
        }
        return true;

      case this.velocity.x > 0 && this.velocity.y < 0:
        if (l > d) {
          this.resolveOverlap(0, d);
        } else {
          this.resolveOverlap(-l, 0);
        }
        return true;

      case this.velocity.x < 0 && this.velocity.y < 0:
        if (r > d) {
          this.resolveOverlap(0, d);
        } else {
          this.resolveOverlap(r, 0);
        }
        return true;

      case this.velocity.x > 0:
        this.resolveOverlap(-l, 0);
        return true;

      case this.velocity.x < 0:
        this.resolveOverlap(r, 0);
        return true;

      case this.velocity.y > 0:
        this.resolveOverlap(0, -u);
        return true;

      case this.velocity.y < 0:
        this.resolveOverlap(0, d);
        return true;

      default:
        return false;
    }
  }

  /**
   * Resolve the overlap of a collision.
   */
  private resolveOverlap(x: number, y: number) {
    if (x) {
      this.position.x += x;
      this.velocity.x = 0;
      this.gravity.x = 0;
    }

    if (y) {
      this.position.y += y;
      this.velocity.y = 0;
      this.gravity.y = 0;

      if (y < 0) {
        this.isOnGround = true;
      }
    }
  }
}

/**
 * Create a new (rectangular) physics body.
 *
 * A rectangle consists of three vector points:
 * - the (x,y) position (top-left corner)
 * - the (width,height) size (bottom-right corner, relative to position)
 * - the (pivotX,pivotY) pivot point (relative to position)
 */
export function body(
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  pivotX = 0,
  pivotY = 0,
) {
  return new Body(vec(x, y), vec(width, height), vec(pivotX, pivotY));
}
