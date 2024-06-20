import { Rect } from "./rect.js";
import { getSettings } from "./settings.js";
import { clamp } from "./utils.js";
import { Vec, vec } from "./vector.js";

const position = vec();
const velocity = vec();
const target = vec();

/**
 * Make the camera go to the give position. Optionally constraining the
 * camera within a rectangular boundary.
 */
export function updateCamera(
  x: number,
  y: number,
  delta: number,
  boundary?: Rect,
) {
  const settings = getSettings();

  target.set(x - settings.width / 2, y - settings.height / 2);

  const distance = position.distance(target);

  velocity
    .copy(target)
    .sub(position)
    .normalize()
    .scale(distance)
    .scale(settings.cameraSmoothing)
    .scale(delta)
    .limit(distance);

  position.add(velocity);

  if (boundary) {
    position.x = clamp(position.x, boundary.left, boundary.right);
    position.y = clamp(position.y, boundary.top, boundary.bottom);
  }
}

/**
 * Set the camera's current position.
 */
export function setCamera(x: number, y: number) {
  const settings = getSettings();
  position.set(x - settings.width / 2, y - settings.height / 2);
}

/**
 * Get the camera's current position.
 */
export function getCamera(): Readonly<Vec> {
  return position;
}
