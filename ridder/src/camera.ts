import { Rectangle } from "./rectangle.js";
import { getSettings } from "./settings.js";
import { delta } from "./state.js";
import { clamp } from "./utils.js";
import {
  addVectors,
  copyVector,
  getDistanceBetweenVectors,
  limitVector,
  normalizeVector,
  scaleVector,
  subtractVectors,
  vec,
  Vector,
} from "./vector.js";

const pos = vec();
const vel = vec();
const target = vec();

export function updateCamera(x: number, y: number, bounds?: Rectangle) {
  const settings = getSettings();

  target.x = x - settings.width / 2;
  target.y = y - settings.height / 2;

  const distance = getDistanceBetweenVectors(pos, target);

  copyVector(vel, target);
  subtractVectors(vel, pos);
  normalizeVector(vel);
  scaleVector(vel, distance * settings.cameraSmoothing * delta);
  limitVector(vel, distance);
  addVectors(pos, vel);

  if (bounds) {
    pos.x = clamp(pos.x, bounds.x, bounds.x + bounds.w - settings.width);
    pos.y = clamp(pos.y, bounds.y, bounds.y + bounds.h - settings.height);
  }
}

export function setCamera(x: number, y: number) {
  const settings = getSettings();
  pos.x = x - settings.width / 2;
  pos.y = y - settings.height / 2;
}

export function getCamera(): Readonly<Vector> {
  return pos;
}
