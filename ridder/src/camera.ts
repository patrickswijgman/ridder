import { getHeight, getWidth } from "./canvas.js";
import { Rectangle, copyRectangle, isRectangleValid, rect } from "./rectangle.js";
import { getDelta } from "./state.js";
import { clamp, random } from "./utils.js";
import { addVector, angleVector, copyVector, getVectorDistance, limitVector, normalizeVector, scaleVector, subtractVector, vec } from "./vector.js";

const position = vec();
const velocity = vec();
const target = vec();
const shake = vec();
const bounds = rect();

let smoothing = 1;
let shakeIntensity = 0;
let shakeReduction = 0.1;
let shakeEnabled = true;

/**
 * Move the camera to the given position. This needs to be called every frame.
 *
 * @see {@link setCameraSmoothing} to make the camera move smoothly if smoothing is below 1.
 *
 * @see {@link setCameraBounds} to keep the camera within the bounds if set.
 */
export function updateCamera(x: number, y: number) {
  const delta = getDelta();
  const width = getWidth();
  const height = getHeight();

  target.x = x - width / 2;
  target.y = y - height / 2;

  if (smoothing < 1) {
    const distance = getVectorDistance(position, target);
    copyVector(velocity, target);
    subtractVector(velocity, position);
    normalizeVector(velocity);
    scaleVector(velocity, distance * smoothing * delta);
    limitVector(velocity, distance);
    addVector(position, velocity);
  } else {
    copyVector(position, target);
  }

  clampCameraToBounds();
}

/**
 * Update the camera shaking mechanism, reducing the shaking `shakeIntensity` gradually with `shakeReduction`.
 */
export function updateCameraShake() {
  if (shakeEnabled && shakeIntensity) {
    const delta = getDelta();
    shakeIntensity = Math.max(0, shakeIntensity - shakeReduction * delta);
    angleVector(shake, random(0, 359));
    scaleVector(shake, shakeIntensity * delta);
  }
}

/**
 * Keep the camera within the bounds if it is set.
 */
function clampCameraToBounds() {
  if (isRectangleValid(bounds)) {
    position.x = clamp(position.x, bounds.x, bounds.x + bounds.w - getWidth());
    position.y = clamp(position.y, bounds.y, bounds.y + bounds.h - getHeight());
  }
}

/**
 * Snap the camera to the given position.
 */
export function setCameraPosition(x: number, y: number) {
  position.x = x - getWidth() / 2;
  position.y = y - getHeight() / 2;
  clampCameraToBounds();
}

/**
 * Get the current camera position.
 *
 * NOTE - This position is the top-left of the camera view.
 */
export function getCameraPosition() {
  return position;
}

/**
 * Get the current camera shake vector.
 */
export function getCameraShake() {
  return shake;
}

/**
 * Set the camera smoothing value.
 * Set a value below 1 to make the camera move smoothly to the target position.
 */
export function setCameraSmoothing(value: number) {
  smoothing = value;
}

/**
 * Whether or not to enable camera shaking.
 * Can be disabled to prevent things like motion sickness.
 */
export function setCameraShakeEnabled(enabled: boolean) {
  shakeEnabled = enabled;
}

/**
 * Set the camera shake intensity that gets reduced by `shakeReduction` every frame.
 *
 * @see {@link setCameraShakeReduction}
 */
export function setCameraShakeIntensity(value: number) {
  shakeIntensity = value;
}

/**
 * Set the camera shake reduction that reduces the shake intensity every frame
 *
 * @see {@link setCameraShakeIntensity}
 */
export function setCameraShakeReduction(value: number) {
  shakeReduction = value;
}

/**
 * Set the camera bounds, the camera is constraint within this rectangle.
 */
export function setCameraBounds(rect: Rectangle) {
  copyRectangle(bounds, rect);
}
