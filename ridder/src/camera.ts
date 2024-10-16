import { getHeight, getWidth } from "./canvas.js";
import { Rectangle, copyRectangle, isRectangleValid, rect } from "./rectangle.js";
import { getDelta } from "./state.js";
import { clamp, random } from "./utils.js";
import { addVector, angleVector, copyVector, getVectorDistance, limitVector, normalizeVector, scaleVector, subtractVector, vec } from "./vector.js";

const position = vec();
const velocity = vec();
const target = vec();
const bounds = rect();

let smoothing = 1;

const shake = vec();

let shakeIntensity = 0;
let shakeReduction = 0.1;

export function updateCamera(x: number, y: number) {
  const delta = getDelta();
  const width = getWidth();
  const height = getHeight();
  target.x = x - width / 2;
  target.y = y - height / 2;

  const distance = getVectorDistance(position, target);

  copyVector(velocity, target);
  subtractVector(velocity, position);
  normalizeVector(velocity);
  scaleVector(velocity, distance * smoothing * delta);
  limitVector(velocity, distance);
  addVector(position, velocity);

  if (shakeIntensity) {
    angleVector(shake, random(0, 359));
    scaleVector(shake, shakeIntensity * delta);
    addVector(position, shake);
    shakeIntensity = Math.max(0, shakeIntensity - shakeReduction * delta);
  }

  if (isRectangleValid(bounds)) {
    position.x = clamp(position.x, bounds.x, bounds.x + bounds.w - width);
    position.y = clamp(position.y, bounds.y, bounds.y + bounds.h - height);
  }
}

export function setCameraPosition(x: number, y: number) {
  position.x = x - getWidth() / 2;
  position.y = y - getHeight() / 2;
}

export function getCameraPosition() {
  return position;
}

export function setCameraSmoothing(value: number) {
  smoothing = value;
}

export function setCameraShakeIntensity(value: number) {
  shakeIntensity = value;
}

export function setCameraShakeReduction(value: number) {
  shakeReduction = value;
}

export function setCameraBounds(rect: Rectangle) {
  copyRectangle(bounds, rect);
}
