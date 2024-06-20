import { Rect } from "./rect.js";
import { getSettings } from "./settings.js";
import { clamp } from "./utils.js";
import { Vec, vec } from "./vector.js";

const position = vec();
const velocity = vec();

/**
 * Make the camera follow the target position. Optionally constraining the
 * camera within a rectangular boundary.
 */
export function updateCamera(target: Vec, delta: number, boundary?: Rect) {
  const settings = getSettings();
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
    const x = settings.width / 2;
    const y = settings.height / 2;
    position.x = clamp(position.x, boundary.x + x, boundary.width - x);
    position.y = clamp(position.y, boundary.y + y, boundary.height - y);
  }
}

/**
 * Set the camera's current position.
 */
export function setCamera(x: number, y: number) {
  position.set(x, y);
}

/**
 * Get the camera's current position.
 */
export function getCamera(): Readonly<Vec> {
  return position;
}
