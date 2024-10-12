import { getHeight, getWidth } from "./canvas.js";
import { Rectangle, copyRectangle, isRectangleValid, rect } from "./rectangle.js";
import { getDelta } from "./state.js";
import { clamp } from "./utils.js";
import { addVector, copyVector, getVectorDistance, limitVector, normalizeVector, scaleVector, subtractVector, vec } from "./vector.js";

const position = vec();
const velocity = vec();
const target = vec();
const bounds = rect();

let smoothing = 1;

export function updateCamera(x: number, y: number) {
  const width = getWidth();
  const height = getHeight();
  target.x = x - width / 2;
  target.y = y - height / 2;

  const distance = getVectorDistance(position, target);

  copyVector(velocity, target);
  subtractVector(velocity, position);
  normalizeVector(velocity);
  scaleVector(velocity, distance * smoothing * getDelta());
  limitVector(velocity, distance);
  addVector(position, velocity);

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

export function setCameraBounds(rect: Rectangle) {
  copyRectangle(bounds, rect);
}
