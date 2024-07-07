export class Point {
  x = 0;
  y = 0;

  /**
   * Set the coordinates of this point.
   */
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Create a new point in 2D space.
 */
export function point(x = 0, y = 0) {
  const p = new Point();

  p.x = x;
  p.y = y;

  return p;
}
