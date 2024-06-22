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
 * Clamp the given value between the given min and max.
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Get the distance between two points.
 */
export function getDistance(x1: number, y1: number, x2: number, y2: number) {
  const x = x1 - x2;
  const y = y1 - y2;
  return Math.sqrt(x * x + y + y);
}

/**
 * Get a new random UUID.
 */
export function randomId() {
  return crypto.randomUUID();
}

/**
 * Return a random int from min until max (inclusive).
 */
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Roll between 0.01 and 1.0, return true if the rolled value is equal or less than the given value.
 */
export function chance(x: number) {
  return x > 0 ? randomInt(1, 100) / 100 <= x : false;
}

/**
 * Pick a random element from the given array.
 */
export function pick<T>(a: Array<T>) {
  return a[randomInt(0, a.length - 1)];
}

/**
 * Shuffle the given array using the Fisher-Yates shuffle algorithm.
 */
export function shuffle<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

/**
 * Remove the given element from the given array.
 */
export function remove<T>(a: Array<T>, e: T) {
  const index = a.indexOf(e);

  if (index !== -1) {
    a.splice(index, 1);
  }

  return a;
}
