import { Rect } from "./rect.js";
import { getSettings } from "./settings.js";
import { delta } from "./state.js";
import { clamp } from "./utils.js";
import { Vec, vec } from "./vector.js";

const position = vec();
const velocity = vec();
const target = vec();

/**
 * Make the camera focus (center) on the given position.
 * Optionally constraining the camera within a rectangular boundary.
 *
 * Set the `cameraSmoothing` setting to increase or decrease the speed at which
 * the camera goes to the given position.
 */
export function updateCamera(x: number, y: number, boundary?: Rect) {
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
    position.x = clamp(
      position.x,
      boundary.left,
      boundary.right - settings.width,
    );

    position.y = clamp(
      position.y,
      boundary.top,
      boundary.bottom - settings.height,
    );
  }
}

/**
 * Snap the focus (center) of the camera to the given position.
 */
export function setCamera(x: number, y: number) {
  const settings = getSettings();
  position.set(x - settings.width / 2, y - settings.height / 2);
}

/**
 * Get the camera's current position.
 * Note that this is the top-left coordinate and not the center at which the camera is focused on.
 */
export function getCamera(): Readonly<Vec> {
  return position;
}
