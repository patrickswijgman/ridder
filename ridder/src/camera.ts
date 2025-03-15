import { getHeight, getWidth } from "./canvas.js";
import { VECTOR_UP } from "./consts.js";
import { isRectangleValid, rect, Rectangle, setRectangle } from "./rectangle.js";
import { getDelta } from "./state.js";
import { clamp, random } from "./utils.js";
import { addVector, angleVector, copyVector, getVectorDistance, limitVector, normalizeVector, scaleVector, subtractVector, vec, Vector } from "./vector.js";

const position = vec();
const velocity = vec();
const target = vec();
const shake = vec();
const bounds = rect();

let smoothing = 1;
let zoom = 1;
let shakeIntensity = 0;
let shakeReduction = 0.1;
let shakeEnabled = true;

/**
 * Updates the camera's `position` to the given target position ({@link x}, {@link y}). Does so smoothly if `smoothing` is smaller than 1.
 *
 * Updates the camera's `shake` vector, reducing the shaking `shakeIntensity` gradually with `shakeReduction`.
 *
 * All while taking into the camera's `zoom` factor into account.
 */
export function updateCamera(x: number, y: number) {
  const delta = getDelta();
  const scale = 1 / zoom;
  const width = getWidth() * scale;
  const height = getHeight() * scale;

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

  clampCameraToBounds(width, height);

  if (shakeEnabled && shakeIntensity) {
    shakeIntensity = Math.max(0, shakeIntensity - shakeReduction * delta);
    copyVector(shake, VECTOR_UP);
    angleVector(shake, random(0, 359));
    scaleVector(shake, shakeIntensity * delta);
  }
}

/**
 * Snap the camera to the given position.
 */
export function setCameraPosition(x: number, y: number) {
  const scale = 1 / zoom;
  const width = getWidth() * scale;
  const height = getHeight() * scale;

  position.x = x - width / 2;
  position.y = y - height / 2;

  clampCameraToBounds(width, height);
}

/**
 * Returns the camera's current position.
 *
 * NOTE - This is the top-left corner, not the center of the camera.
 */
export function getCameraPosition(): Readonly<Vector> {
  return position;
}

/**
 * Set the camera's smoothing value.
 */
export function setCameraSmoothing(value: number) {
  smoothing = value;
}

/**
 * The rectangular area which to bind the camera's movement within.
 */
export function setCameraBounds(x: number, y: number, width: number, height: number) {
  setRectangle(bounds, x, y, width, height);
}

/**
 * Get the camera's movement boundary.
 */
export function getCameraBounds(): Readonly<Rectangle> {
  return bounds;
}

/**
 * Set the current camera shake intensity and the value by which the intensity will be reduced every frame.
 */
export function setCameraShake(intensity: number, reduction: number) {
  shakeIntensity = intensity;
  shakeReduction = reduction;
}

/**
 * Get the camera's shake vector.
 */
export function getCameraShake(): Readonly<Vector> {
  return shake;
}

/**
 * Set the camera's zoom value.
 */
export function setCameraZoom(value: number) {
  zoom = value;
}

/**
 * Get the camera's current zoom value.
 */
export function getCameraZoom() {
  return zoom;
}

/**
 * Keep the camera within its bounds.
 */
function clampCameraToBounds(width: number, height: number) {
  if (isRectangleValid(bounds)) {
    position.x = clamp(position.x, bounds.x, bounds.x + bounds.w - width);
    position.y = clamp(position.y, bounds.y, bounds.y + bounds.h - height);
  }
}
