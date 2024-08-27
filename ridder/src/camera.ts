import { Rectangle } from "./rectangle.js";
import { getSettings } from "./settings.js";
import { getEngineState } from "./state.js";
import { clamp } from "./utils.js";
import { addVector, copyVector, getVectorDistance, limitVector, normalizeVector, scaleVector, subtractVector, vec, Vector } from "./vector.js";

export type Camera = {
  position: Vector;
  velocity: Vector;
  target: Vector;
};

const camera: Camera = {
  position: vec(),
  velocity: vec(),
  target: vec(),
};

export function updateCamera(x: number, y: number, bounds?: Rectangle) {
  const settings = getSettings();
  const state = getEngineState();

  camera.target.x = x - settings.width / 2;
  camera.target.y = y - settings.height / 2;

  const distance = getVectorDistance(camera.position, camera.target);

  copyVector(camera.velocity, camera.target);
  subtractVector(camera.velocity, camera.position);
  normalizeVector(camera.velocity);
  scaleVector(camera.velocity, distance * settings.cameraSmoothing * state.delta);
  limitVector(camera.velocity, distance);
  addVector(camera.position, camera.velocity);

  if (bounds) {
    camera.position.x = clamp(camera.position.x, bounds.x, bounds.x + bounds.w - settings.width);
    camera.position.y = clamp(camera.position.y, bounds.y, bounds.y + bounds.h - settings.height);
  }
}

export function setCameraPosition(x: number, y: number) {
  const settings = getSettings();
  camera.position.x = x - settings.width / 2;
  camera.position.y = y - settings.height / 2;
}

export function getCamera() {
  return camera;
}
