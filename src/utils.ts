/**
 * Remove the given element from the given array.
 */
export function remove<T>(a: Array<T>, e: T) {
  const index = a.indexOf(e);
  if (index !== -1) {
    a.splice(index, 1);
  }
}

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
  return randomInt(1, 100) / 100 <= x;
}

/**
 * Whether or not the web page (document) is visible or not.
 */
export function isWebPageVisible() {
  return document.visibilityState === "visible";
}
