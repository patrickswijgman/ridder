/**
 * Convert the given degrees to radians.
 */
export function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

/**
 * Convert the given radians to degrees.
 */
export function toDegrees(radians: number) {
  return (radians * 180) / Math.PI;
}

/**
 * Clamp a value between the given minimum and maximum values.
 * If it's lower than the minimum value the minimum value is returned, if it's higher than the maximum value the maximum value is returned.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Return the linearly interpolated value between the values {@link a} and {@link b} using the scalar value {@link t}.
 */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Get the distance between two points.
 * @param x1 - The x coordinate of the first point.
 * @param y1 - The y coordinate of the first point.
 * @param x2 - The x coordinate of the second point.
 * @param y2 - The y coordinate of the second point.
 */
export function getDistance(x1: number, y1: number, x2: number, y2: number) {
  const x = x1 - x2;
  const y = y1 - y2;
  return Math.sqrt(x * x + y * y);
}

/**
 * Get the angle in degrees between two points.
 * @param x1 - The x coordinate of the first point.
 * @param y1 - The y coordinate of the first point.
 * @param x2 - The x coordinate of the second point.
 * @param y2 - The y coordinate of the second point.
 */
export function getAngle(x1: number, y1: number, x2: number, y2: number) {
  return toDegrees(Math.atan2(y2 - y1, x2 - x1));
}

/**
 * Get a new UUID using the browser's crypto API.
 *
 * NOTE - You do need a web server with HTTPS (localhost excluded) for this to work.
 */
export function uuid() {
  return crypto.randomUUID();
}

/**
 * Get a random number between min and max (inclusive).
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Roll for a chance to win!
 * @param chance - A value between 0 and 1, e.g. 0.4 for 40% chance.
 */
export function roll(chance: number) {
  return Math.random() < chance;
}

/**
 * Get a random element from the array.
 */
export function pick<T>(a: Array<T>) {
  return a[random(0, a.length - 1)];
}

/**
 * Shuffle the array in-place using the Fisher-Yates algorithm.
 */
export function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = random(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

/**
 * Removes the first-found element from the array in-place.
 */
export function remove<T>(a: Array<T>, e: T) {
  const index = a.indexOf(e);
  if (index !== -1) {
    a.splice(index, 1);
  }
  return a;
}

/**
 * Repeat the action {@link x} times.
 */
export function repeat(x: number, action: (x: number) => void) {
  for (let i = 0; i < x; i++) {
    action(i);
  }
}

/**
 * Create a new canvas element with the given width and height, returns a tuple with the canvas and its 2D context.
 */
export function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  return [canvas, ctx] as const;
}
