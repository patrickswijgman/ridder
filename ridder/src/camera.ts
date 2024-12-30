import { getHeight, getWidth } from "./canvas.js";
import { VECTOR_UP } from "./consts.js";
import { getMousePosition } from "./input.js";
import { Rectangle, isRectangleValid, rect, setRectangle } from "./rectangle.js";
import { getDelta } from "./state.js";
import { clamp, random } from "./utils.js";
import { Vector, addVector, angleVector, copyVector, getVectorDistance, limitVector, normalizeVector, scaleVector, subtractVector, vec } from "./vector.js";

export type Camera = {
  position: Vector;
  velocity: Vector;
  target: Vector;
  shake: Vector;
  bounds: Rectangle;
  viewport: Rectangle;
  smoothing: number;
  shakeIntensity: number;
  shakeReduction: number;
  shakeEnabled: boolean;
  mousePosition: Vector;
};

export function camera(): Camera {
  return {
    position: vec(),
    velocity: vec(),
    target: vec(),
    shake: vec(),
    bounds: rect(),
    viewport: rect(),
    smoothing: 1,
    shakeIntensity: 0,
    shakeReduction: 0.1,
    shakeEnabled: true,
    mousePosition: vec(),
  };
}

/**
 * Updates the camera's `position` to the given target position ({@link x}, {@link y}). Does so smoothly if `smoothing` is smaller than 1.
 *
 * Updates the camera's `mousePosition` relative to the camera's `position`.
 *
 * Updates the camera's `viewport` rectangle to the camera's `position`.
 *
 * Updates the camera's `shake` vector, reducing the shaking `shakeIntensity` gradually with `shakeReduction`.
 */
export function updateCamera(c: Camera, x: number, y: number) {
  const delta = getDelta();
  const width = getWidth();
  const height = getHeight();

  c.target.x = x - width / 2;
  c.target.y = y - height / 2;

  if (c.smoothing < 1) {
    const distance = getVectorDistance(c.position, c.target);
    copyVector(c.velocity, c.target);
    subtractVector(c.velocity, c.position);
    normalizeVector(c.velocity);
    scaleVector(c.velocity, distance * c.smoothing * delta);
    limitVector(c.velocity, distance);
    addVector(c.position, c.velocity);
  } else {
    copyVector(c.position, c.target);
  }

  clampCameraToBounds(c);

  const mouse = getMousePosition();
  copyVector(c.mousePosition, mouse);
  addVector(c.mousePosition, c.position);

  setRectangle(c.viewport, c.position.x, c.position.y, width, height);

  if (c.shakeEnabled && c.shakeIntensity) {
    c.shakeIntensity = Math.max(0, c.shakeIntensity - c.shakeReduction * delta);
    copyVector(c.shake, VECTOR_UP);
    angleVector(c.shake, random(0, 359));
    scaleVector(c.shake, c.shakeIntensity * delta);
  }
}

/**
 * Snap the camera to the given position.
 *
 * NOTE - Use this instead of setting the position manually to set the proper position and keep it within the bounds.
 */
export function setCameraPosition(c: Camera, x: number, y: number) {
  c.position.x = x - getWidth() / 2;
  c.position.y = y - getHeight() / 2;
  clampCameraToBounds(c);
}

/**
 * Keep the camera within its bounds.
 */
function clampCameraToBounds(c: Camera) {
  if (isRectangleValid(c.bounds)) {
    c.position.x = clamp(c.position.x, c.bounds.x, c.bounds.x + c.bounds.w - getWidth());
    c.position.y = clamp(c.position.y, c.bounds.y, c.bounds.y + c.bounds.h - getHeight());
  }
}
